import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import ts from 'typescript'
import { normalizePath } from 'vite'

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

interface JsDoc {
  description: string
  tags: Map<string, string>
}

interface CollectedProp {
  name: string
  types: string[]
  payloads: string[]
  required: boolean
  default?: string
  descriptions: string[]
}

const HIDDEN_PROPS = new Set(['children'])
const EVENT_PROP = /^on[a-z]/
const PROPS_DESTRUCTURING = /let\s*\{([\s\S]*?)\}\s*:\s*([A-Za-z0-9_]+)[^=]*=\s*\$props\(\)/
const BINDABLE = /^\$bindable(?:<[\s\S]*>)?\(([\s\S]*)\)$/
const BEFORE_REGEX = /(?:^|[=(,:[!&|?{};+\-*%~^]|=>|\b(?:return|typeof|void|in|of|case))\s*$/
const AFTER_POSTFIX = /(?:\+\+|--)\s*$/
const BLOCK_TAG = /^@([A-Za-z]+)(?:\s+([\s\S]*))?$/
const INLINE_LINK = /\{@link(?:code|plain)?\s+([^}\s|]+)(?:[\s|]+([^}]*))?\}/g
const SENTENCE_BREAK = /(?<=[.!?])\s+/

const programs = new Map<string, ts.Program>()
const printer = ts.createPrinter({ removeComments: true })

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    if (name === 'node_modules' || name === '__tests__') return []
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim()

const normalizeType = (text: string) =>
  normalizeText(text)
    .replace(/([<([]) /g, '$1')
    .replace(/ ([>)\]])/g, '$1')
    .replace(/^\|\s*/, '')

const stringEnd = (text: string, start: number) => {
  for (let index = start + 1; index < text.length; index++) {
    if (text[index] === '\\') index++
    else if (text[index] === text[start]) return index
  }
  return text.length
}

const isGenericOpen = (text: string, index: number) => {
  if (!/[\w$]/.test(text[index - 1] ?? '') || !/[\w${[(]/.test(text[index + 1] ?? '')) {
    return false
  }
  let depth = 0
  for (let cursor = index + 1; cursor < text.length; cursor++) {
    const char = text[cursor]
    if (char === "'" || char === '"' || char === '`') cursor = stringEnd(text, cursor)
    else if (char === '=' && text[cursor + 1] === '>') cursor++
    else if ('([{<'.includes(char)) depth++
    else if (char === '>' && depth === 0) return true
    else if (')]}>'.includes(char)) {
      if (depth === 0) return false
      depth--
    } else if (char === ',' && depth === 0) return false
  }
  return false
}

const regexEnd = (text: string, start: number) => {
  let inClass = false
  for (let index = start + 1; index < text.length; index++) {
    const char = text[index]
    if (char === '\\') index++
    else if (char === '[') inClass = true
    else if (char === ']') inClass = false
    else if (char === '/' && !inClass) {
      let end = index + 1
      while (/[a-z]/i.test(text[end] ?? '')) end++
      return end
    } else if (char === '\n') return -1
  }
  return -1
}

const unionParts = (text: string) => {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let index = 0; index < text.length; index++) {
    const char = text[index]
    if (char === "'" || char === '"' || char === '`') index = stringEnd(text, index)
    else if (char === '=' && text[index + 1] === '>') index++
    else if ('([{<'.includes(char)) depth++
    else if (')]}>'.includes(char)) depth--
    else if (char === '|' && depth === 0) {
      parts.push(text.slice(start, index).trim())
      start = index + 1
    }
  }
  parts.push(text.slice(start).trim())
  return parts.filter(Boolean)
}

const startsRegex = (current: string) => BEFORE_REGEX.test(current) && !AFTER_POSTFIX.test(current)

const splitTopLevel = (text: string) => {
  const parts: string[] = []
  let current = ''
  let depth = 0
  let angleDepth = 0
  let quote: string | undefined
  for (let index = 0; index < text.length; index++) {
    const char = text[index]
    const next = text[index + 1]
    if (quote) {
      current += char
      if (char === '\\') current += text[++index] ?? ''
      else if (char === quote) quote = undefined
      continue
    }
    if (char === '/' && startsRegex(current) && next !== '/' && next !== '*') {
      const end = regexEnd(text, index)
      if (end !== -1) {
        current += text.slice(index, end)
        index = end - 1
        continue
      }
    }
    if (char === '/' && next === '/') {
      const end = text.indexOf('\n', index)
      index = end === -1 ? text.length : end - 1
      continue
    }
    if (char === '/' && next === '*') {
      const end = text.indexOf('*/', index + 2)
      index = end === -1 ? text.length : end + 1
      continue
    }
    if (char === '=' && next === '>') {
      current += '=>'
      index++
      continue
    }
    if (char === "'" || char === '"' || char === '`') quote = char
    else if ('([{'.includes(char)) depth++
    else if (')]}'.includes(char)) depth--
    else if (char === '<' && isGenericOpen(text, index)) angleDepth++
    else if (char === '>' && angleDepth > 0) angleDepth--
    else if (char === ',' && depth === 0 && angleDepth === 0) {
      parts.push(current)
      current = ''
      continue
    }
    current += char
  }
  parts.push(current)
  return parts.map((part) => part.trim()).filter(Boolean)
}

export const parseDestructuring = (source: string): Destructured | undefined => {
  const match = PROPS_DESTRUCTURING.exec(source)
  if (!match) return undefined
  const defaults = new Map<string, string | undefined>()
  const bindable = new Set<string>()
  for (const entry of splitTopLevel(match[1])) {
    if (entry.startsWith('...')) continue
    const equals = entry.indexOf('=')
    const left = equals === -1 ? entry : entry.slice(0, equals)
    const name = left
      .split(':')[0]
      .trim()
      .replace(/^['"]|['"]$/g, '')
    let value = equals === -1 ? undefined : normalizeText(entry.slice(equals + 1))
    const bindableMatch = value === undefined ? null : BINDABLE.exec(value)
    if (bindableMatch) {
      bindable.add(name)
      value = bindableMatch[1].trim() || undefined
    }
    defaults.set(name, value)
  }
  return { annotation: match[2], defaults, bindable }
}

const renderInlineTags = (text: string) =>
  text.replace(INLINE_LINK, (_, target: string, label?: string) =>
    label?.trim() ? label.trim() : `\`${target}\``
  )

export const parseJsDoc = (comment: string): JsDoc => {
  const lines = comment
    .replace(/^\/\*\*/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\*? ?/, ''))
  const description: string[] = []
  const tags = new Map<string, string>()
  let tag: { name: string; lines: string[] } | undefined
  const closeTag = () => {
    if (tag && !tags.has(tag.name)) tags.set(tag.name, normalizeText(tag.lines.join('\n')))
  }
  for (const line of lines) {
    const match = BLOCK_TAG.exec(line.trim())
    if (match) {
      closeTag()
      tag = { name: match[1], lines: [match[2] ?? ''] }
    } else if (tag) {
      tag.lines.push(line)
    } else {
      description.push(line)
    }
  }
  closeTag()
  return { description: normalizeText(renderInlineTags(description.join('\n'))), tags }
}

const mergeDescriptions = (descriptions: string[]) => {
  const sentences: string[] = []
  for (const description of descriptions) {
    for (const sentence of description.split(SENTENCE_BREAK)) {
      if (!sentences.includes(sentence)) sentences.push(sentence)
    }
  }
  return sentences.join(' ')
}

export const parsePackageComponents = (repoRoot: string, lib: string): GeneratedSignature[] => {
  const files = walk(lib)
  const libPrefix = `${normalizePath(lib)}/`
  const program = ts.createProgram(
    files.filter((file) => file.endsWith('.ts')),
    {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      strict: true,
      skipLibCheck: true,
      noEmit: true
    },
    undefined,
    programs.get(lib)
  )
  programs.set(lib, program)
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

  const readJsDoc = (declaration: ts.Node): JsDoc => {
    const jsDoc = ts.getJSDocCommentsAndTags(declaration).filter(ts.isJSDoc).at(-1)
    return jsDoc ? parseJsDoc(jsDoc.getText()) : { description: '', tags: new Map() }
  }

  const typeString = (type: ts.Type) => {
    const parts = unionParts(
      checker.typeToString(
        type,
        undefined,
        ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType
      )
    ).filter((part) => part !== 'undefined')
    const nullable = parts.includes('null')
    return normalizeType(
      [...parts.filter((part) => part !== 'null'), ...(nullable ? ['null'] : [])].join(' | ')
    )
  }

  const referencesTypeParameter = (node: ts.Node): boolean =>
    (ts.isTypeReferenceNode(node) && checker.getTypeAtLocation(node).isTypeParameter()) ||
    ts.forEachChild(node, referencesTypeParameter) === true

  const nodeText = (node: ts.TypeNode) =>
    normalizeType(printer.printNode(ts.EmitHint.Unspecified, node, node.getSourceFile()))

  const declaredType = (node: ts.TypeNode | undefined, symbol: ts.Symbol) => {
    if (node && !referencesTypeParameter(node) && !ts.isIndexedAccessTypeNode(node)) {
      return nodeText(node)
    }
    let type = checker.getTypeOfSymbol(symbol)
    if (type.isTypeParameter()) type = checker.getBaseConstraintOfType(type) ?? type
    return typeString(type)
  }

  const signaturePayload = (signature: ts.Signature) => {
    const parameters = signature.getParameters().map((parameter) => {
      const declaration = parameter.valueDeclaration
      const isParameter = declaration !== undefined && ts.isParameter(declaration)
      const rest = isParameter && declaration.dotDotDotToken !== undefined
      const name = isParameter ? declaration.name.getText() : parameter.name
      const type = declaredType(isParameter ? declaration.type : undefined, parameter)
      return { name: `${rest ? '...' : ''}${name}`, rest, type }
    })
    if (parameters.length === 0) return 'void'
    if (parameters.length === 1 && !parameters[0].rest) return parameters[0].type
    return `(${parameters.map(({ name, type }) => `${name}: ${type}`).join(', ')})`
  }

  const callPayloads = (symbol: ts.Symbol) => {
    const type = checker.getNonNullableType(checker.getTypeOfSymbol(symbol))
    const members = type.isUnion() ? type.types : [type]
    if (members.some((member) => member.getCallSignatures().length === 0)) return []
    return members.flatMap((member) => member.getCallSignatures().map(signaturePayload))
  }

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
        payloads: [...prop.payloads],
        descriptions: [...prop.descriptions]
      })
      return
    }
    existing.required = required(existing)
    for (const text of prop.types) if (!existing.types.includes(text)) existing.types.push(text)
    for (const text of prop.payloads) {
      if (!existing.payloads.includes(text)) existing.payloads.push(text)
    }
    for (const text of prop.descriptions) {
      if (!existing.descriptions.includes(text)) existing.descriptions.push(text)
    }
    existing.default ??= prop.default
  }

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
      if (!declaration?.getSourceFile().fileName.startsWith(libPrefix)) continue
      const { description, tags } = readJsDoc(declaration)
      if (tags.has('deprecated')) continue
      const text = declaredType((declaration as ts.PropertySignature).type, symbol)
      collected.set(symbol.name, {
        name: symbol.name,
        types: text === 'never' ? [] : [text],
        payloads: EVENT_PROP.test(symbol.name) ? callPayloads(symbol) : [],
        required: !(symbol.flags & ts.SymbolFlags.Optional),
        default: tags.get('default') || undefined,
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
      sourcePath: normalizePath(relative(repoRoot, file)),
      props: [],
      events: [],
      bindings: []
    }

    for (const prop of collected.values()) {
      if (HIDDEN_PROPS.has(prop.name)) continue
      if (prop.types.length === 0 && prop.payloads.length === 0) continue
      const type = prop.types.join(' | ')
      const description = mergeDescriptions(prop.descriptions) || undefined

      if (prop.payloads.length > 0) {
        signature.events.push({ name: prop.name, payload: prop.payloads.join(' | '), description })
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
