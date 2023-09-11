import type { Node } from 'yoga-layout'
import * as Yoga from 'yoga-layout'
import type { NodeProps } from '../types/props'

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

export const jsxPropToYogaProp = (s: string) => s.toUpperCase().replace('-', '_')

// replace "space-between" with "SpaceBetween"
const propValueToYogaValue = (value: string) => {
  return value
    .split('-')
    .map((word) => capitalize(word))
    .join('')
}

export const applyNodeProps = (node: Node, props: NodeProps, scaleFactor: number) => {
  return Object.keys(props).forEach((name) => {
    const value = props[name as keyof NodeProps]

    const AnyYoga = Yoga as any

    if (typeof value === 'string') {
      switch (name) {
        case 'flexDir':
        case 'dir':
        case 'flexDirection':
          return node.setFlexDirection(AnyYoga.FlexDirection[propValueToYogaValue(value)])
        case 'align':
          node.setAlignItems(AnyYoga.Align[propValueToYogaValue(value)])
          node.setAlignItems(AnyYoga.Align[propValueToYogaValue(value)])
          return node.setAlignContent(AnyYoga.Align[propValueToYogaValue(value)])
        case 'alignContent':
          return node.setAlignContent(AnyYoga.Align[propValueToYogaValue(value)])
        case 'alignItems':
          return node.setAlignItems(AnyYoga.Align[propValueToYogaValue(value)])
        case 'alignSelf':
          return node.setAlignSelf(AnyYoga.Align[propValueToYogaValue(value)])
        case 'justify':
        case 'justifyContent':
          return node.setJustifyContent(AnyYoga.Justify[propValueToYogaValue(value)])
        case 'wrap':
        case 'flexWrap':
          return node.setFlexWrap(AnyYoga.Wrap[propValueToYogaValue(value)])
        case 'basis':
        case 'flexBasis':
          return node.setFlexBasis(value as any)

        default:
          return (node[`set${capitalize(name)}` as keyof Node] as any)(value)
      }
    } else if (typeof value === 'number') {
      const scaledValue = value * scaleFactor
      switch (name) {
        case 'basis':
        case 'flexBasis':
          return node.setFlexBasis(scaledValue)
        case 'grow':
        case 'flexGrow':
          return node.setFlexGrow(scaledValue)
        case 'shrink':
        case 'flexShrink':
          return node.setFlexShrink(scaledValue)
        case 'align':
          return node.setAlignItems(value as any)
        case 'justify':
          return node.setJustifyContent(value as any)
        case 'flexDir':
        case 'dir':
          return node.setFlexDirection(value as any)
        case 'wrap':
          return node.setFlexWrap(value as any)
        case 'padding':
        case 'p':
          return node.setPadding(Yoga.Edge.All, scaledValue)
        case 'paddingLeft':
        case 'pl':
          return node.setPadding(Yoga.Edge.Left, scaledValue)
        case 'paddingRight':
        case 'pr':
          return node.setPadding(Yoga.Edge.Right, scaledValue)
        case 'paddingTop':
        case 'pt':
          return node.setPadding(Yoga.Edge.Top, scaledValue)
        case 'paddingBottom':
        case 'pb':
          return node.setPadding(Yoga.Edge.Bottom, scaledValue)

        case 'margin':
        case 'm':
          return node.setMargin(Yoga.Edge.All, scaledValue)
        case 'marginLeft':
        case 'ml':
          return node.setMargin(Yoga.Edge.Left, scaledValue)
        case 'marginRight':
        case 'mr':
          return node.setMargin(Yoga.Edge.Right, scaledValue)
        case 'marginTop':
        case 'mt':
          return node.setMargin(Yoga.Edge.Top, scaledValue)
        case 'marginBottom':
        case 'mb':
          return node.setMargin(Yoga.Edge.Bottom, scaledValue)
        case 'gap':
          return node.setGap(Yoga.Gutter.All, scaledValue)

        default:
          return (node[`set${capitalize(name)}` as keyof Node] as any)(scaledValue)
      }
    }
  })
}
