import * as fileUtils from '../utils/fileUtils.js'
import * as componentParser from '../utils/componentParser.js'
import * as componentUtils from '../utils/componentUtils.js'
import { toMagicString } from '../utils/magicStringUtils.js'
import indexToPosition from 'index-to-position'
import * as logger from '../utils/logger.js'

export const getColumnAndRow = async (moduleId: string, componentIndex: number) => {
  const code = fileUtils.readFile(moduleId)
  if (!componentParser.hasTComponent(code)) {
    logger.logError({
      moduleId,
      context: logger.Context.NoTComponentFound
    })
    return { column: 0, row: 0 }
  }
  const { markup, reassemble } = await componentUtils.disassembleComponent(code)
  const magicMarkup = toMagicString(markup)
  const node = componentParser.findNodeByIndex(magicMarkup, componentIndex)
  if (!node) {
    logger.logError({
      moduleId,
      context: `Could not find node by index ${componentIndex}`
    })
    return { column: 0, row: 0 }
  }
  const start = node.start
  const sliceTo = start + 1 + node.name.length
  // slice the markup to the start of the node
  const slice = markup.slice(0, sliceTo)
  // assemble the component back together to get the index
  const finalComponent = await reassemble(slice)
  // get the index of the last character
  const index = finalComponent.length - 1
  // convert the index to a position
  const pos = indexToPosition(finalComponent, index, {
    oneBased: true
  })
  return { column: pos.column, row: pos.line }
}
