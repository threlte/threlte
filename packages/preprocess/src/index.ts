import { parse, walk } from 'svelte/compiler'
import type { PreprocessorGroup } from 'svelte/types/compiler/preprocess'
import MagicString from 'magic-string'
import * as THREE from 'three'
import { Node } from 'estree-walker'

type ExtendedNode<T> = T & {
  start: number
  end: number
}

const isExtendedNode = <T>(node: any): node is ExtendedNode<T> => {
  return (
    'start' in node &&
    'end' in node &&
    typeof node.start === 'number' &&
    typeof node.end === 'number'
  )
}

type ImportMap = Record<
  string,
  {
    imports: string[]
  }
>

/**
 * Parses an ImportMap to actual imports
 * @param importMap
 * @returns
 */
const parseImportMap = (importMap: ImportMap) => {
  return Object.entries(importMap)
    .filter(([_from, { imports }]) => imports.length > 0)
    .map(([module, { imports }]) => {
      return `import { ${[...new Set(imports)].join(', ')} } from '${module}';`
    })
    .join('\n')
}

const addImport = (importMap: ImportMap, module: string, imports: string[]) => {
  if (importMap[module]) {
    importMap[module] = {
      imports: [...importMap[module].imports, ...imports]
    }
  } else {
    importMap[module] = {
      imports
    }
  }
}

const actOnImportDeclarationNode = (
  node: ExtendedNode<Extract<Node, { type: 'ImportDeclaration' }>>,
  markup: MagicString,
  documentImportMap: ImportMap
) => {
  // remove import of <T> component
  if (node.source.value === '@threlte/core') {
    if (
      node.specifiers.find((s: any) => s.imported.name === 'T') &&
      !markup.original.includes('<T ') &&
      !markup.original.includes('<T\n')
    ) {
      // remove import of <T> component
      const isMultiImport = node.specifiers.length > 1
      if (!isMultiImport) {
        // remove the whole import statement
        markup.remove(node.start, node.end)
      } else {
        // cut out the T import
        const specifierIndex = node.specifiers.findIndex((s) => {
          return s.type === 'ImportSpecifier' && s.imported.name === 'T'
        })
        const specifier = node.specifiers[specifierIndex]
        const castedSpecifier = specifier as ExtendedNode<typeof specifier>

        const isLastImport = specifierIndex === node.specifiers.length - 1
        const isFirstImport = specifierIndex === 0

        if (isLastImport) {
          const specifierBefore = node.specifiers[specifierIndex - 1]
          const castedSpecifierBefore = specifierBefore as ExtendedNode<typeof specifierBefore>
          markup.remove(castedSpecifierBefore.end, castedSpecifier.end)
        } else if (isFirstImport) {
          const specifierAfter = node.specifiers[specifierIndex + 1]
          const castedSpecifierAfter = specifierAfter as ExtendedNode<typeof specifierAfter>
          markup.remove(castedSpecifier.start, castedSpecifierAfter.start)
        } else {
          const specifierBefore = node.specifiers[specifierIndex - 1]
          const specifierAfter = node.specifiers[specifierIndex + 1]
          const castedSpecifierBefore = specifierBefore as ExtendedNode<typeof specifierBefore>
          const castedSpecifierAfter = specifierAfter as ExtendedNode<typeof specifierAfter>
          markup.update(castedSpecifierBefore.end, castedSpecifierAfter.start, ', ')
        }
      }
    }
  }

  if (typeof node.source.value === 'string') {
    addImport(
      documentImportMap,
      node.source.value,
      node.specifiers
        .filter((s) => s.type === 'ImportSpecifier')
        .map((specifier: any) => specifier.imported.name)
    )
  }
}

const actOnScript = (node: Node, markup: MagicString, documentImportMap: ImportMap) => {
  if (!isExtendedNode<typeof node>(node)) {
    // We should probably do something here
    return
  }

  if (node.type === 'ImportDeclaration') {
    actOnImportDeclarationNode(node, markup, documentImportMap)
  }
}

const preprocessMarkup = (
  content: string,
  transformOptions?: PreprocessOptions
): {
  markup: string
} => {
  const prefix = transformOptions?.prefix ? `${transformOptions?.prefix}.` : 'T.'

  if (!content.includes(`<${prefix}`)) {
    return {
      markup: content
    }
  }

  const importMap: ImportMap = {}
  const documentImportMap: ImportMap = {}

  const ast = parse(content)

  const markup = new MagicString(content)

  const scriptNode = ast.instance
  const scriptModuleNode = ast.module

  // do stuff on the scripts nodes
  // - collect imports
  // - remove imports of <T> component
  walk(scriptNode as any, {
    enter(node, parent, key, index) {
      actOnScript(node, markup, documentImportMap)
    }
  })
  walk(scriptModuleNode as any, {
    enter(node, parent, key, index) {
      actOnScript(node, markup, documentImportMap)
    }
  })

  // do stuff on the markup nodes
  walk(ast.html as any, {
    enter(node, parent, key, index) {
      const anyNode = node as any
      if (!isExtendedNode<typeof node>(node)) {
        // We should probably do something here
        return
      }

      // The ast that is returned by the svelte compiler is not typed correctly.
      // It contains HTML nodes that are not part of ESTree.
      if (anyNode.type === 'Element' || anyNode.type === 'InlineComponent') {
        const { name } = node as { name: string }
        if (!name.startsWith(prefix)) return
        const maybeImport = name.replace(prefix, '')

        const isInThree = maybeImport in THREE

        const isInExtensions =
          transformOptions?.extensions &&
          Object.values(transformOptions.extensions).find((extension) => {
            return extension.includes(maybeImport)
          })

        if (isInThree || isInExtensions) {
          if (isInThree) {
            addImport(importMap, 'three', [maybeImport])
          } else if (transformOptions && transformOptions.extensions) {
            const extension = Object.entries(transformOptions.extensions).find(([key, value]) => {
              if (Array.isArray(value)) {
                return value.includes(maybeImport)
              } else {
                return value === maybeImport
              }
            })
            if (!extension) return
            const [module] = extension
            addImport(importMap, module, [maybeImport])
          } else {
            // this should never happen, sanity check
            return
          }

          // change start of node
          const length = name.length

          const castedNode = node as ExtendedNode<typeof node>

          markup.remove(castedNode.start + 1, castedNode.start + 1 + length)
          markup.appendRight(castedNode.start + 1, `Three type={${maybeImport}}`)

          // change end of node: </boxGeometry> -> </Three>
          const selfClosing = content.slice(castedNode.end - 2, castedNode.end) === '/>'
          if (!selfClosing) {
            markup.update(castedNode.end - length - 1, castedNode.end - 1, 'Three')
          }
        }
      }
    }
  })

  if (Object.keys(importMap).length > 0) {
    addImport(importMap, '@threlte/core', ['Three'])
  }

  // Filter out existing dependencies
  Object.entries(documentImportMap).forEach(([from, { imports }]) => {
    if (importMap[from]) {
      importMap[from].imports = importMap[from].imports.filter((i) => !imports.includes(i))
    }
  })

  if (Object.keys(importMap).length > 0) {
    const imports = parseImportMap(importMap)

    let anyScriptNode = scriptNode || scriptModuleNode

    if (anyScriptNode) {
      let start = -1

      walk(anyScriptNode as any, {
        enter(node, parent, key, index) {
          if (!isExtendedNode<typeof node>(node)) {
            // We should probably do something here
            return
          }
          if (node.type === 'Program') {
            start = node.start
          }
        }
      })

      markup.appendLeft(start, '\n' + imports + '\n')
    } else {
      markup.prepend('<script>\n' + imports + '\n</script>\n')
    }
  }

  return {
    markup: markup.toString()
  }
}

export type PreprocessOptions = {
  prefix?: string
  /**
   * A map of extensions to import from. The key is the module to import from,
   * the value is an array of import names.
   */
  extensions: Record<string, string[]>
}

/**
 * This preprocessor will transform <{prefix}.BoxGeometry>
 * into <Three type={BoxGeometry} /> + imports
 * @param options
 * @returns
 */
export const preprocessThrelte = (options?: PreprocessOptions): PreprocessorGroup => {
  return {
    markup: ({ content, filename }) => {
      const { markup } = preprocessMarkup(content, options)

      if (content.includes('<T')) {
        console.log('content', content)
        console.log('markup', markup)
      }

      return {
        code: markup
      }
    }
  }
}
