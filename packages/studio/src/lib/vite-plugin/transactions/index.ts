import * as hmr from '../hmr/index.js'
import * as componentParser from '../utils/componentParser.js'
import { addStudioRuntimeProps, hasTComponent } from '../utils/componentParser.js'
import * as componentUtils from '../utils/componentUtils.js'
import * as fileUtils from '../utils/fileUtils.js'
import { toMagicString } from '../utils/magicStringUtils.js'

export const transformComponent = async (code: string, id: string) => {
  if (!id.endsWith('.svelte')) return code
  if (!hasTComponent(code)) return code
  if (id.includes('node_modules')) return code

  const { markup, reassemble } = await componentUtils.disassembleComponent(code)
  const magicMarkup = toMagicString(markup)
  addStudioRuntimeProps(magicMarkup, id)
  const finalComponent = await reassemble(magicMarkup.toString())
  return finalComponent
}

export const syncTransactions = async (
  transactions: {
    attributeName: string
    attributeValue: unknown
    componentIndex: number
    moduleId: string
    precision?: number
  }[]
) => {
  const transactionsByModuleId = new Map<string, typeof transactions>()
  transactions.forEach((transaction) => {
    const transactions = transactionsByModuleId.get(transaction.moduleId) ?? []
    transactions.push(transaction)
    transactionsByModuleId.set(transaction.moduleId, transactions)
  })

  for (const [moduleId, transactions] of transactionsByModuleId.entries()) {
    const code = fileUtils.readFile(moduleId)
    if (!componentParser.hasTComponent(code)) {
      console.error('Component does not need transform')
      continue
    }
    const { markup, reassemble } = await componentUtils.disassembleComponent(code)

    let currentMarkup = markup

    transactions.forEach((transaction) => {
      const magicMarkup = toMagicString(currentMarkup)
      const node = componentParser.findNodeByIndex(magicMarkup, transaction.componentIndex)
      if (!node) {
        console.error('Could not find node by index', transaction.componentIndex)
        return
      }
      componentParser.upsertAttribute(
        magicMarkup,
        node,
        transaction.attributeName,
        transaction.attributeValue,
        'last',
        transaction.precision
      )

      currentMarkup = magicMarkup.toString()
    })

    const finalComponent = await reassemble(currentMarkup)
    fileUtils.writeFile(moduleId, finalComponent)
    hmr.disableModuleHmr(moduleId)
  }
}
