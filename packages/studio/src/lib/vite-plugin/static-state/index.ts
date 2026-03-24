import util from 'node:util'
import { preprocess } from 'svelte/compiler'
import ts from 'typescript'
import { staticStateMetaKey } from '../../config.js'
import type { Members, Modifier, StaticStateMeta } from '../../types.js'
import * as hmr from '../hmr/index.js'
import { readFile, writeFile } from '../utils/fileUtils.js'
import { toMagicString } from '../utils/magicStringUtils.js'
import { isModule } from '../utils/componentUtils.js'

const createAst = (code: string, id: string) => {
  return ts.createSourceFile(id, code, ts.ScriptTarget.Latest, true)
}

const allowedExtensions = ['.svelte.ts', '.svelte.js', '.svelte']
const isAllowedExtension = (id: string) => {
  return allowedExtensions.some((ext) => id.endsWith(ext))
}

const isSvelteComponent = (id: string) => {
  return id.endsWith('.svelte')
}

const hasStaticState = (code: string) => {
  return code.includes('extends StaticState')
}

const regex = /extends StaticState[^{]*{/gm

const appendMeta = (code: string, meta: StaticStateMeta) => {
  // add meta info to the code: id
  return code.replace(regex, `$& ${staticStateMetaKey} = ${JSON.stringify(meta)}`)
}

const isExtendsStaticState = (node: ts.Node): node is ts.ClassDeclaration => {
  if (node.kind !== ts.SyntaxKind.ClassDeclaration) return false
  const n = node as ts.ClassDeclaration
  return !!n.heritageClauses?.some((clause) => {
    return clause.getFullText().includes('StaticState')
  })
}

const isClassWithName = (node: ts.ClassDeclaration, name: string): boolean => {
  if (!node.name) return false
  if (node.name.kind !== ts.SyntaxKind.Identifier) return false
  if (node.name.getText() !== name) return false
  return true
}

const extractMembers = (node: ts.ClassDeclaration): Members => {
  const members: Members = []
  node.members.forEach((member) => {
    if (member.kind !== ts.SyntaxKind.PropertyDeclaration) return
    const modifiers: Modifier[] = []
    ts.getJSDocTags(member).forEach((tag) => {
      modifiers.push({
        name: tag.tagName.getText(),
        value: tag.comment?.toString() ?? ''
      })
    })
    if (!member.name || member.name.kind !== ts.SyntaxKind.Identifier) return
    const m = member as ts.PropertyDeclaration
    if (!m.initializer || m.initializer.kind !== ts.SyntaxKind.CallExpression) return
    const mi = m.initializer as ts.CallExpression
    const args = mi.arguments
    if (args.length !== 1) return
    const arg = args[0]!
    members.push({
      name: member.name!.getText(),
      argument: {
        start: arg.pos,
        end: arg.end
      },
      modifiers
    })
  })
  return members
}

const transformScript = (code: string, id: string, module: boolean) => {
  const members: Members = []

  // Recursive function to traverse the AST
  function traverse(node: ts.Node, depth = 0) {
    if (isExtendsStaticState(node)) {
      members.push(...extractMembers(node))
    }
    ts.forEachChild(node, (childNode) => traverse(childNode, depth + 1))
  }

  // Start traversing the AST from the source file
  traverse(createAst(code, id))

  const meta: StaticStateMeta = {
    id,
    members,
    module
  }

  return appendMeta(code, meta)
}

export const transformStaticState = async (code: string, id: string) => {
  if (!isAllowedExtension(id)) return code
  if (!hasStaticState(code)) return code

  if (isSvelteComponent(id)) {
    const processed = await preprocess(
      code,
      {
        script: ({ content, attributes }) => {
          const module = isModule(attributes)
          return {
            code: transformScript(content, id, module)
          }
        }
      },
      {
        filename: id
      }
    )
    return processed.code
  } else {
    return transformScript(code, id, false)
  }
}

const mutateScript = (
  code: string,
  id: string,
  className: string,
  propertyName: string,
  value: unknown
): {
  needsRewrite: boolean
  code: string
} => {
  let needsRewrite = false
  const ms = toMagicString(code)

  // Recursive function to traverse the AST
  function traverse(node: ts.Node, depth = 0) {
    if (isExtendsStaticState(node) && isClassWithName(node, className)) {
      const members = extractMembers(node)
      const member = members.find((m) => m.name === propertyName)
      if (!member) return
      ms.overwrite(
        member.argument.start,
        member.argument.end,
        util.inspect(value, {
          maxArrayLength: Infinity,
          maxStringLength: Infinity,
          breakLength: Infinity,
          depth: Infinity
        })
      )
      needsRewrite = true
    }
    ts.forEachChild(node, (childNode) => traverse(childNode, depth + 1))
  }

  // Start traversing the AST from the source file
  traverse(createAst(code, id))

  return {
    code: ms.toString(),
    needsRewrite
  }
}

export const mutateStaticState = async (
  id: string,
  module: boolean,
  className: string,
  propertyName: string,
  value: unknown
) => {
  if (!isAllowedExtension(id)) return
  const content = readFile(id)
  if (!hasStaticState(content)) return

  if (isSvelteComponent(id)) {
    let needsRewrite = false
    const processed = await preprocess(
      content,
      {
        script: ({ content, attributes }) => {
          // If the module attribute is different from the module flag, the
          // class we're looking for is in a different script block, skip the
          // mutation
          if (isModule(attributes) !== module) return
          if (!hasStaticState(content)) return
          const mutatedScript = mutateScript(content, id, className, propertyName, value)
          needsRewrite = mutatedScript.needsRewrite
          return {
            code: mutatedScript.code
          }
        }
      },
      {
        filename: id
      }
    )

    if (needsRewrite) {
      writeFile(id, processed.code)
      hmr.disableModuleHmr(id)
    }
  } else {
    const { code, needsRewrite } = mutateScript(content, id, className, propertyName, value)
    if (needsRewrite) {
      writeFile(id, code)
      hmr.disableModuleHmr(id)
    }
  }
}
