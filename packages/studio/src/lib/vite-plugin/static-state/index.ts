import ts from 'typescript'
import { readFile, writeFile } from '../utils/fileUtils'
import { toMagicString } from '../utils/magicStringUtils'
import util from 'node:util'
import * as hmr from '../hmr'
import { moduleIdKey } from '../../config'

const allowedExtensions = ['.svelte.ts', '.svelte.js']
const isAllowedExtension = (id: string) => {
  return allowedExtensions.some((ext) => id.endsWith(ext))
}

const hasStaticState = (code: string) => {
  return code.includes('extends StaticState')
}

const regex = /extends StaticState[^\{]*{/gm

type Meta = {
  id: string
  classNames: string[]
}

const appendMeta = (code: string, id: string) => {
  // add meta info to the code: id
  return code.replace(regex, `$& ${moduleIdKey} = '${id}'`)
}

const extractScript = (code: string) => {
  // CURRENTLY WORKS ONLY FOR .svelte.ts and .svelte.js
  return code
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

type Member = {
  name: string
  argument: {
    start: number
    end: number
  }
}

type Members = Member[]

const extractMembers = (node: ts.ClassDeclaration): Members => {
  const members: Members = []
  node.members.forEach((member) => {
    if (member.kind !== ts.SyntaxKind.PropertyDeclaration) return
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
      }
    })
  })
  return members
}

export const transformStaticState = (code: string, id: string) => {
  if (!isAllowedExtension(id)) return code
  if (!hasStaticState(code)) return code
  return appendMeta(code, id)
}

export const mutateStaticState = (
  id: string,
  className: string,
  propertyName: string,
  value: unknown
) => {
  let needsRewrite = false
  const code = readFile(id)
  const ms = toMagicString(code)

  const ast = ts.createSourceFile(id, code, ts.ScriptTarget.ESNext, true)

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
  traverse(ast)

  if (needsRewrite) {
    writeFile(id, ms.toString())
    hmr.disableModuleHmr(id)
  }
}
