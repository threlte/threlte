import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import ts from 'typescript'

export interface GeneratedProp {
  name: string
  type: string
  required: boolean
  default?: string
  description?: string
}

export interface GeneratedEvent {
  name: string
  payload: string
  description?: string
}

export interface GeneratedBinding {
  name: string
  type: string
  description?: string
}

export interface GeneratedSignature {
  /** The `.svelte` file, relative to the repository root. */
  sourcePath: string
  props: GeneratedProp[]
  events: GeneratedEvent[]
  bindings: GeneratedBinding[]
}

interface Destructured {
  annotation: string
  defaults: Map<string, string | undefined>
  bindable: Set<string>
}

interface CollectedProp {
  name: string
  types: string[]
  required: boolean
  default?: string
  descriptions: string[]
}

const HIDDEN_PROPS = new Set(['children', 'ref'])
const EVENT_PROP = /^on[a-z]/
const PROPS_DESTRUCTURING = /let\s*\{([\s\S]*?)\}\s*:\s*([A-Za-z0-9_]+)[^=]*=\s*\$props\(\)/
const BINDABLE = /^\$bindable(?:<[^>]*>)?\(([\s\S]*)\)$/
const EVENT_PAYLOAD = /^\(\s*\w+\??\s*:\s*([\s\S]+?)\s*\)\s*=>/

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    if (name === 'node_modules' || name === '__tests__') return []
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const normalize = (text: string) =>
  text
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^\|\s*/, '')

/** Splits on commas that aren't nested in brackets or strings. */
const splitTopLevel = (text: string) => {
  const parts: string[] = []
  let depth = 0
  let quote: string | undefined
  let start = 0
  for (let index = 0; index < text.length; index++) {
    const char = text[index]
    if (quote) {
      if (char === quote && text[index - 1] !== '\\') quote = undefined
    } else if (char === "'" || char === '"' || char === '`') {
      quote = char
    } else if ('([{<'.includes(char)) {
      depth++
    } else if (')]}>'.includes(char)) {
      depth--
    } else if (char === ',' && depth === 0) {
      parts.push(text.slice(start, index))
      start = index + 1
    }
  }
  parts.push(text.slice(start))
  return parts.map((part) => part.trim()).filter(Boolean)
}

/** Reads a component's `$props()` destructuring: its type annotation, defaults and bindables. */
export const parseDestructuring = (source: string): Destructured | undefined => {
  const match = PROPS_DESTRUCTURING.exec(source)
  if (!match) return undefined
  const defaults = new Map<string, string | undefined>()
  const bindable = new Set<string>()
  for (const entry of splitTopLevel(match[1].replace(/\/\/.*$/gm, ''))) {
    if (entry.startsWith('...')) continue
    const equals = entry.indexOf('=')
    const left = equals === -1 ? entry : entry.slice(0, equals)
    const name = left
      .split(':')[0]
      .trim()
      .replace(/^['"]|['"]$/g, '')
    let value = equals === -1 ? undefined : normalize(entry.slice(equals + 1))
    const bindableMatch = value === undefined ? null : BINDABLE.exec(value)
    if (bindableMatch) {
      bindable.add(name)
      value = bindableMatch[1].trim() || undefined
    }
    defaults.set(name, value)
  }
  return { annotation: match[2], defaults, bindable }
}

/**
 * Builds a signature for every component in a package's `src/lib` from the
 * `types.ts` interface annotating its `$props()`. Only members declared in
 * the package are included, so props inherited from three.js or
 * `@threlte/core` are left to the page's `extends` line.
 */
export const parsePackageComponents = (repoRoot: string, lib: string): GeneratedSignature[] => {
  const files = walk(lib)
  const program = ts.createProgram(
    files.filter((file) => file.endsWith('.ts')),
    {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      strict: true,
      skipLibCheck: true,
      noEmit: true
    }
  )
  const checker = program.getTypeChecker()

  const findExport = (directory: string, name: string) => {
    for (const candidate of [
      join(directory, 'types.ts'),
      join(directory, 'webgpu', 'types.ts'),
      join(dirname(directory), 'types.ts')
    ]) {
      const sourceFile = program.getSourceFile(candidate)
      const moduleSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile)
      const found = moduleSymbol
        ? checker.getExportsOfModule(moduleSymbol).find((symbol) => symbol.name === name)
        : undefined
      if (found) return found
    }
    return undefined
  }

  const typeText = (declaration: ts.Declaration, symbol: ts.Symbol) => {
    const node = (declaration as ts.PropertySignature).type
    const typeParameter = node && checker.getTypeAtLocation(node).isTypeParameter()
    if (node && !typeParameter && !ts.isIndexedAccessTypeNode(node)) {
      return normalize(node.getText())
    }
    let type = checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(symbol, declaration))
    if (type.isTypeParameter()) type = checker.getBaseConstraintOfType(type) ?? type
    return normalize(checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation))
  }

  const tagText = (tag: ts.JSDocTagInfo | undefined) =>
    tag ? normalize(ts.displayPartsToString(tag.text)) : undefined

  const merge = (
    collected: Map<string, CollectedProp>,
    prop: CollectedProp,
    required: (existing: CollectedProp) => boolean
  ) => {
    const existing = collected.get(prop.name)
    if (!existing) {
      collected.set(prop.name, {
        ...prop,
        types: [...prop.types],
        descriptions: [...prop.descriptions]
      })
      return
    }
    existing.required = required(existing)
    for (const text of prop.types) if (!existing.types.includes(text)) existing.types.push(text)
    for (const text of prop.descriptions) {
      if (!existing.descriptions.includes(text)) existing.descriptions.push(text)
    }
    existing.default ??= prop.default
  }

  /**
   * TypeScript turns `Base & (A | B)` into `(Base & A) | (Base & B)`, so each
   * branch of a union is collected on its own: a prop is required only when
   * every branch requires it.
   */
  const collect = (type: ts.Type): Map<string, CollectedProp> => {
    const collected = new Map<string, CollectedProp>()

    if (type.isUnion()) {
      const branches = type.types.map(collect)
      for (const branch of branches) {
        for (const prop of branch.values()) {
          const inEveryBranch = branches.every((other) => other.get(prop.name)?.required)
          merge(collected, prop, () => inEveryBranch)
          collected.get(prop.name)!.required = inEveryBranch
        }
      }
      return collected
    }

    if (type.isIntersection()) {
      for (const member of type.types) {
        for (const prop of collect(member).values()) {
          merge(collected, prop, (existing) => existing.required || prop.required)
        }
      }
      return collected
    }

    for (const symbol of checker.getPropertiesOfType(type)) {
      const declaration = symbol.declarations?.[0]
      if (!declaration?.getSourceFile().fileName.startsWith(lib)) continue
      const tags = symbol.getJsDocTags(checker)
      if (tags.some((tag) => tag.name === 'deprecated')) continue
      const text = typeText(declaration, symbol)
      const description = normalize(
        ts.displayPartsToString(symbol.getDocumentationComment(checker))
      )
      collected.set(symbol.name, {
        name: symbol.name,
        types: text === 'never' ? [] : [text],
        required: !(symbol.flags & ts.SymbolFlags.Optional),
        default: tagText(tags.find((tag) => tag.name === 'default')),
        descriptions: description ? [description] : []
      })
    }
    return collected
  }

  const signatures: GeneratedSignature[] = []

  for (const file of files.filter((file) => file.endsWith('.svelte'))) {
    const destructured = parseDestructuring(readFileSync(file, 'utf8'))
    const symbol = destructured && findExport(dirname(file), destructured.annotation)
    if (!destructured || !symbol) continue

    const collected = collect(checker.getDeclaredTypeOfSymbol(symbol))

    const signature: GeneratedSignature = {
      sourcePath: relative(repoRoot, file),
      props: [],
      events: [],
      bindings: []
    }

    for (const prop of collected.values()) {
      if (HIDDEN_PROPS.has(prop.name)) continue
      const type = prop.types.join(' | ')
      const description = prop.descriptions.join(' ') || undefined

      if (EVENT_PROP.test(prop.name) && type.includes('=>')) {
        const payload = EVENT_PAYLOAD.exec(type)?.[1] ?? 'void'
        signature.events.push({ name: prop.name, payload, description })
      } else if (destructured.bindable.has(prop.name)) {
        signature.bindings.push({ name: prop.name, type, description })
      } else {
        signature.props.push({
          name: prop.name,
          type,
          required: prop.required,
          default: prop.default ?? destructured.defaults.get(prop.name),
          description
        })
      }
    }

    signatures.push(signature)
  }

  return signatures
}
