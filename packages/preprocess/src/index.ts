import { preprocess, parse, walk } from 'svelte/compiler'
import MagicString from 'magic-string'
import * as THREE from 'three'

type Dependencies = Record<string, string[]>

const dependenciesToImports = (dependencies: Dependencies) => {
  return Object.entries(dependencies)
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

  const dependencies: Dependencies = {}
  const ast = parse(content)
  const markup = new MagicString(content)

  let scriptContentNode: { start: number; end: number } | undefined
  const existingDependencies: Dependencies = {}

  const addDependency = (from: string, module: string) => {
    if (dependencies[from]) {
      dependencies[from].push(module)
    } else {
      dependencies[from] = [module]
    }
  }

  const addExistingDependencies = (from: string, modules: string[]) => {
    if (existingDependencies[from]) {
      existingDependencies[from].push(...modules)
    } else {
      existingDependencies[from] = modules
    }
  }

  walk(ast, {
    enter(node, parent, key, index) {
      if (node.type === 'Script' && node.context === 'default') {
        scriptContentNode = node.content as { start: number; end: number }
      }
      if (node.type === 'ImportDeclaration') {
        addExistingDependencies(
          node.source.value,
          node.specifiers.map((specifier: any) => specifier.imported.name)
        )
      }

      if (node.type === 'Element') {
        const { name } = node as { name: string }
        if (!name.startsWith(prefix)) return
        const maybeImport = name.replace(prefix, '')
        if (maybeImport in THREE) {
          addDependency('three', maybeImport)

          // change start of node
          const length = name.length
          markup.remove(node.start + 1, node.start + 1 + length)
          markup.appendRight(node.start + 1, `Three2 type={${maybeImport}}`)

          // change end of node: </boxGeometry> -> </Three2>
          const selfClosing = content.slice(node.end - 2, node.end) === '/>'
          if (!selfClosing) {
            markup.update(node.end - length - 1, node.end - 1, 'Three2')
          }
        }
      }
    }
  })

  if (Object.keys(dependencies).length > 0) {
    addDependency('@threlte/core', 'Three2')
  }

  // Filter out existing dependencies
  Object.entries(existingDependencies).forEach(([from, modules]) => {
    if (dependencies[from]) {
      dependencies[from] = dependencies[from].filter((module) => !modules.includes(module))
    }
  })

  if (Object.keys(dependencies).length > 0) {
    dependencies['@threlte/core'] = ['Three2']
    const imports = dependenciesToImports(dependencies)
    if (scriptContentNode) {
      markup.appendLeft(scriptContentNode.start, imports)
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
}

/**
 * This preprocessor will transform <t.BoxGeometry> into <Three2 type={BoxGeometry} />
 * @param options
 * @returns
 */
export const preprocessThrelte = (options?: TransformOptions): Parameters<typeof preprocess>[1] => {
  return {
    markup: ({ content, filename }) => {
      if (!filename) return { code: content }

      const { markup } = preprocessMarkup(content, options)

      return {
        code: markup
      }
    }
  }
}
