import type { Expression } from 'estree'
import { walk, type Node } from 'estree-walker'
import MagicString from 'magic-string'
import { inspect } from 'node:util'
import { parse } from 'svelte/compiler'
import type { StudioProps } from '../../types.js'
import json5 from 'json5'

export const hasTComponent = (code: string): boolean => {
  return code.includes('<T.') || code.includes('<T ') || code.includes('<T\n')
}
type BaseAttribute = {
  name: string
  start: number
  end: number
}

type BaseAttributeValue = {
  start: number
  end: number
}

type TextAttributeValue = BaseAttributeValue & {
  type: 'Text'
  raw: string
  data: string
}

type AttributeShorthandValue = BaseAttributeValue & {
  type: 'AttributeShorthand'
  expression: Expression & {
    start: number
    end: number
  }
}

type MustacheTagAttributeValue = BaseAttributeValue & {
  type: 'MustacheTag'
  expression: Expression & {
    start: number
    end: number
  }
}

type EventHandlerAttribute = BaseAttribute & {
  type: 'EventHandler'
  name: string
}

type BooleanAttribute = BaseAttribute & {
  type: 'Attribute'
  value: true
}

type TextAttribute = BaseAttribute & {
  type: 'Attribute'
  value: TextAttributeValue[]
}

type MustacheTagAttribute = BaseAttribute & {
  type: 'Attribute'
  value: MustacheTagAttributeValue[]
}

type ShorthandAttribute = BaseAttribute & {
  type: 'Attribute'
  value: AttributeShorthandValue[]
}

type ValueAttribute = BooleanAttribute | TextAttribute | MustacheTagAttribute | ShorthandAttribute

type Attribute = EventHandlerAttribute | ValueAttribute

const isValueAttribute = (attribute: Attribute): attribute is ValueAttribute => {
  return attribute.type === 'Attribute'
}

const isAttributeWithTextValue = (attribute: Attribute): attribute is TextAttribute => {
  if (!isValueAttribute(attribute)) return false
  if (attribute.value === true) return false
  return attribute.value[0].type === 'Text'
}

const isAttributeWithMustacheTagValue = (
  attribute: Attribute
): attribute is MustacheTagAttribute => {
  if (!isValueAttribute(attribute)) return false
  if (attribute.value === true) return false
  return attribute.value[0].type === 'MustacheTag'
}

const isAttributeWithShorthandValue = (attribute: Attribute): attribute is ShorthandAttribute => {
  if (!isValueAttribute(attribute)) return false
  if (attribute.value === true) return false
  return attribute.value[0].type === 'AttributeShorthand'
}

const isAttributeWithBooleanValue = (attribute: Attribute): attribute is BooleanAttribute => {
  if (!isValueAttribute(attribute)) return false
  return typeof attribute.value === 'boolean'
}

type DefinedNode = Omit<Node, 'type'> & {
  type: Node['type'] | 'InlineComponent'
  name: string
  start: number
  end: number
  attributes: Attribute[]
}

type TComponentNode = DefinedNode & {
  name: `T.${string}` | 'T'
}

const isDefinedNode = (node: unknown): node is DefinedNode => {
  return (
    typeof node === 'object' &&
    node !== null &&
    'attributes' in node &&
    Array.isArray(node.attributes) &&
    'name' in node &&
    'start' in node &&
    'end' in node
  )
}

const isTComponentNode = (node: unknown): node is TComponentNode => {
  return (
    isDefinedNode(node) &&
    node.type === 'InlineComponent' &&
    (node.name.startsWith('T.') || node.name === 'T')
  )
}

const isMultiLineNode = (
  markup: MagicString,
  node: DefinedNode
): { isMultiLine: boolean; indent: string } => {
  let isMultiLine = false
  let indent = ''
  if (node.attributes.length > 0) {
    // find new line chars in between
    const firstAttribute = node.attributes.toSorted((a, b) => a.start - b.start).at(0)
    if (!firstAttribute) throw new Error('No attributes found')
    const startOfFirstAttribute = firstAttribute.start
    // +1 for "<"
    const endOfTagOpen = node.start + node.name.length + 1
    const slice = markup.slice(endOfTagOpen, startOfFirstAttribute)
    isMultiLine = slice.includes('\n')
    indent = slice
  }
  return {
    isMultiLine,
    indent
  }
}

export const findNodeByIndex = (markup: MagicString, index: number): TComponentNode | undefined => {
  const ast = parse(markup.toString())
  let currentIndex = -1
  let finalNode: TComponentNode | undefined
  walk((ast as any).html as Node, {
    enter(node) {
      if (!isTComponentNode(node)) return
      currentIndex += 1
      if (currentIndex === index) finalNode = node
    }
  })
  return finalNode
}

/**
 * Stringifies any value with a set precision (default 4).
 */
const stringifyAttributeValue = (value: unknown, precision = 4): string => {
  const reducedPrecision = JSON.parse(
    JSON.stringify(
      value,
      (_, val) => {
        return val.toFixed ? Number(val.toFixed(precision)) : val
      },
      ' '
    )
  )
  return inspect(reducedPrecision, {
    depth: Infinity,
    breakLength: Infinity,
    maxArrayLength: Infinity,
    maxStringLength: Infinity
  })
}

/**
 * Upserts an attribute to a `<T>` component.
 */
export const upsertAttribute = (
  markup: MagicString,
  node: TComponentNode,
  attributeName: string,
  value: unknown,
  position: 'first' | 'last',
  precision?: number
) => {
  const attribute = node.attributes.find((attr) => attr.name === attributeName)

  if (attribute) {
    if (isAttributeWithBooleanValue(attribute)) {
      // if the value is "true", we can return early: `name` -> `name`
      if (value === true) return
      if (typeof value === 'string') {
        // it's a text value, so we need to convert it to a mustache tag: `name` -> `name="value"`
        markup.appendLeft(attribute.end, `="${value}"`)
      } else {
        // it's a mustache tag value, so we need to stringify it: `name` -> `name={value}`
        markup.appendLeft(attribute.end, `={${stringifyAttributeValue(value, precision)}}`)
      }
    } else if (isAttributeWithTextValue(attribute)) {
      const firstValue = attribute.value[0]
      if (typeof value === 'string') {
        // it's a text value, so we can just update it: `name="old"` -> `name="new"`
        markup.overwrite(firstValue.start, firstValue.end, value)
      } else if (typeof value === 'boolean' && value) {
        // it's a boolean value, so we can remove the text part: `name="old"` -> `name`
        markup.remove(firstValue.start - 2, firstValue.end + 1)
      } else {
        // it's a mustache tag value, so we need to stringify it: `name="old"` -> `name={new}`
        markup.overwrite(
          firstValue.start - 1,
          firstValue.end + 1,
          `{${stringifyAttributeValue(value, precision)}}`
        )
      }
    } else if (isAttributeWithMustacheTagValue(attribute)) {
      const firstValue = attribute.value[0]
      if (typeof value === 'string') {
        // it's a text value, so we can update it: `name={old}` -> `name="new"`
        markup.overwrite(firstValue.start, firstValue.end, `"${value}"`)
      } else if (typeof value === 'boolean' && value) {
        // it's a boolean value, so we can remove the mustache tag part: `name={old}` -> `name`
        markup.remove(firstValue.start - 1, firstValue.end)
      } else {
        // it's a mustache tag value, so we can update it: `name={old}` -> `name={new}`
        markup.overwrite(
          firstValue.start + 1,
          firstValue.end - 1,
          stringifyAttributeValue(value, precision)
        )
      }
    } else if (isAttributeWithShorthandValue(attribute)) {
      if (typeof value === 'string') {
        // it's a text value, so we can update it: `{name}` -> `name="new"`
        markup.overwrite(attribute.start, attribute.end, `${attributeName}="${value}"`)
      } else if (typeof value === 'boolean' && value) {
        // it's a boolean value, so we can remove the shorthand part: `{name}` -> `name`
        markup.overwrite(attribute.start, attribute.end, attributeName)
      } else {
        // it's a mustache tag value, so we can update it: `{name}` -> `name={new}`
        markup.overwrite(
          attribute.start,
          attribute.end,
          `${attributeName}={${stringifyAttributeValue(value, precision)}}`
        )
      }
    }
  } else {
    // insert
    const { indent } = isMultiLineNode(markup, node)

    let space = ''

    // account for `<` at start of node
    let start = node.start + node.name.length + 1
    if (node.attributes.length > 0 && position === 'last') {
      const lastAttribute = node.attributes.reduce((a, b) => (a.end > b.end ? a : b))
      start = lastAttribute.end
    }
    if (node.attributes.length === 0) {
      space = ' '
    }
    if (typeof value === 'boolean' && value) {
      markup.appendLeft(start, `${space}${indent}${attributeName}`)
    } else if (typeof value === 'string') {
      markup.appendLeft(start, `${space}${indent}${attributeName}="${value}"`)
    } else {
      markup.appendLeft(
        start,
        `${space}${indent}${attributeName}={${stringifyAttributeValue(value, precision)}}`
      )
    }
  }
}

/**
 * Removes an attribute from a `<T>` component.
 */
export const removeAttribute = (
  markup: MagicString,
  node: TComponentNode,
  attributeName: string
): void => {
  const attribute = node.attributes.find((attr) => attr.name === attributeName)
  if (!attribute) return

  let start = attribute.start
  if (attribute === node.attributes.at(0)) {
    // it's the first attribute, either because it's
    // the only one or because it's the first one
    start = node.start + node.name.length + 1
  }

  markup.remove(start, attribute.end)
}

/**
 * Read the value of an attribute from a `<T>` component.
 */
export const readAttribute = (markup: MagicString, node: TComponentNode, attributeName: string) => {
  const attribute = node.attributes.find((attr) => attr.name === attributeName)
  if (!attribute) throw new Error(`Attribute not found with name ${attributeName}`)
  if (isAttributeWithBooleanValue(attribute)) {
    return true
  } else if (isAttributeWithTextValue(attribute)) {
    return attribute.value[0].data
  } else if (isAttributeWithMustacheTagValue(attribute)) {
    const firstValue = attribute.value[0]
    return json5.parse(markup.slice(firstValue.start + 1, firstValue.end - 1))
  } else if (isAttributeWithShorthandValue(attribute)) {
    throw new Error('Shorthand props are not supported.')
  } else {
    throw new Error('Unknown attribute type')
  }
}

export const addStudioRuntimeProps = (markup: MagicString, id: string): void => {
  const ast = parse(markup.toString())
  let index = 0
  walk((ast as any).html as Node, {
    enter(node) {
      if (!isTComponentNode(node)) return
      const props: StudioProps = { moduleId: id, index }
      upsertAttribute(markup, node, 'threlteStudio', props, 'last')
      index += 1
    }
  })
}
