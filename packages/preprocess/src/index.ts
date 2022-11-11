import { preprocess, parse, walk } from 'svelte/compiler'
import MagicString from 'magic-string'
import * as THREE from 'three'

type ImportMap = Record<string, string[]>

const parseImportMap = (dependencies: ImportMap) => {
  return Object.entries(dependencies)
    .filter(([_from, modules]) => modules.length > 0)
    .map(([from, modules]) => {
      return `import { ${[...new Set(modules)].join(', ')} } from '${from}'`
    })
    .join('\n')
}

const preprocessMarkup = (
  content: string,
  transformOptions?: TransformOptions
): {
  markup: string
} => {
  const prefix = transformOptions?.prefix ?? 't.'

  if (!content.includes(`<${prefix}`)) {
    return {
      markup: content
    }
  }

  const importMap: ImportMap = {}
  const ast = parse(content)
  const markup = new MagicString(content)

  let scriptContentNode: { start: number; end: number } | undefined
  const documentImportMap: ImportMap = {}

  const addImport = (from: string, module: string) => {
    if (importMap[from]) {
      importMap[from].push(module)
    } else {
      importMap[from] = [module]
    }
  }

  const addDocumentImport = (from: string, modules: string[]) => {
    if (documentImportMap[from]) {
      documentImportMap[from].push(...modules)
    } else {
      documentImportMap[from] = modules
    }
  }

  walk(ast, {
    enter(node, parent, key, index) {
      if (node.type === 'Script' && node.context === 'default') {
        scriptContentNode = node.content as { start: number; end: number }
      }
      if (node.type === 'ImportDeclaration') {
        addDocumentImport(
          node.source.value,
          node.specifiers
            .filter((s: any) => s.type === 'ImportSpecifier')
            .map((specifier: any) => specifier.imported.name)
        )
      }

      if (node.type === 'Element' || node.type === 'InlineComponent') {
        const { name } = node as { name: string }
        if (!name.startsWith(prefix)) return
        const maybeImport = name.replace(prefix, '')

        const isInThree = maybeImport in THREE
        const isInExtensions =
          transformOptions?.extensions && maybeImport in transformOptions?.extensions

        if (isInThree || isInExtensions) {
          if (isInThree) {
            addImport('three', maybeImport)
          } else if (
            transformOptions &&
            transformOptions.extensions &&
            transformOptions.extensions[maybeImport]
          ) {
            addImport(transformOptions.extensions[maybeImport], maybeImport)
          } else {
            // this should never happen, sanity check
            return
          }

          // change start of node
          const length = name.length
          markup.remove(node.start + 1, node.start + 1 + length)
          markup.appendRight(node.start + 1, `Three type={${maybeImport}}`)

          // change end of node: </boxGeometry> -> </Three>
          const selfClosing = content.slice(node.end - 2, node.end) === '/>'
          if (!selfClosing) {
            markup.update(node.end - length - 1, node.end - 1, 'Three')
          }
        }
      }
    }
  })

  if (Object.keys(importMap).length > 0) {
    addImport('@threlte/core', 'Three')
  }

  // Filter out existing dependencies
  Object.entries(documentImportMap).forEach(([from, modules]) => {
    if (importMap[from]) {
      importMap[from] = importMap[from].filter((module) => !modules.includes(module))
    }
  })

  if (Object.keys(importMap).length > 0) {
    const imports = parseImportMap(importMap)
    if (scriptContentNode) {
      markup.appendLeft(scriptContentNode.start, '\n' + imports)
    } else {
      markup.prepend('<script>\n' + imports + '\n</script>\n')
    }
  }

  return {
    markup: markup.toString()
  }
}

export type TransformOptions = {
  prefix?: string
  extensions: Record<string, string>
}

/**
 * This preprocessor will transform <{prefix}.BoxGeometry> into <Three type={BoxGeometry} /> + imports
 * @param options
 * @returns
 */
export const preprocessThrelte = (options?: TransformOptions): Parameters<typeof preprocess>[1] => {
  return {
    markup: ({ content }) => {
      const { markup } = preprocessMarkup(content, options)

      return {
        code: markup
      }
    }
  }
}
