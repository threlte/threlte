import type { Align, FlexDirection, Justify, Node, PositionType, Wrap } from 'yoga-layout'
import * as Yoga from 'yoga-layout'

export type FlexPlane = 'xy' | 'yz' | 'xz'

// prettier-ignore
export const propSetter = {
  alignItems: (align: keyof typeof Align, node: Node) => node.setAlignItems(Yoga.Align[align]),
  /** Shorthand for alignItems */
  align: (align: keyof typeof Align, node: Node) => node.setAlignItems(Yoga.Align[align]),
  alignSelf: (align: keyof typeof Align, node: Node) => node.setAlignSelf(Yoga.Align[align]),
  alignContent: (align: keyof typeof Align, node: Node) => node.setAlignContent(Yoga.Align[align]),

  justifyContent: (justify: keyof typeof Justify, node: Node) => node.setJustifyContent(Yoga.Justify[justify]),
  /** Shorthand for justifyContent */
  justify: (justify: keyof typeof Justify, node: Node) => node.setJustifyContent(Yoga.Justify[justify]),
  flexDirection: (dir: keyof typeof FlexDirection, node: Node) => node.setFlexDirection(Yoga.FlexDirection[dir]),
  /** Shorthand for flexDirection */
  flexDir: (dir: keyof typeof FlexDirection, node: Node) => node.setFlexDirection(Yoga.FlexDirection[dir]),
  /** Shorthand for flexDirection */
  dir: (dir: keyof typeof FlexDirection, node: Node) => node.setFlexDirection(Yoga.FlexDirection[dir]),

  flexWrap: (wrap: keyof typeof Wrap, node: Node) => node.setFlexWrap(Yoga.Wrap[wrap]),
  /** Shorthand for flexWrap */
  wrap: (wrap: keyof typeof Wrap, node: Node) => node.setFlexWrap(Yoga.Wrap[wrap]),

  flexBasis: (basis: Parameters<Node['setFlexBasis']>[0], node: Node) => node.setFlexBasis(basis),
  /** Shorthand for flexBasis */
  basis: (basis: Parameters<Node['setFlexBasis']>[0], node: Node) => node.setFlexBasis(basis),

  flexGrow: (grow: Parameters<Node['setFlexGrow']>[0], node: Node) => node.setFlexGrow(grow),
  /** Shorthand for flexGrow */
  grow: (grow: Parameters<Node['setFlexGrow']>[0], node: Node) => node.setFlexGrow(grow),

  flexShrink: (shrink: Parameters<Node['setFlexShrink']>[0], node: Node) => node.setFlexShrink(shrink),
  /** Shorthand for flexShrink */
  shrink: (shrink: Parameters<Node['setFlexShrink']>[0], node: Node) => node.setFlexShrink(shrink),

  height: (height: Parameters<Node['setHeight']>[0], node: Node) => node.setHeight(height),
  width: (width: Parameters<Node['setWidth']>[0], node: Node) => node.setWidth(width),
  maxHeight: (maxHeight: Parameters<Node['setMaxHeight']>[0], node: Node) => node.setMaxHeight(maxHeight),
  maxWidth: (maxWidth: Parameters<Node['setMaxWidth']>[0], node: Node) => node.setMaxWidth(maxWidth),
  minHeight: (minHeight: Parameters<Node['setMinHeight']>[0], node: Node) => node.setMinHeight(minHeight),
  minWidth: (minWidth: Parameters<Node['setMinWidth']>[0], node: Node) => node.setMinWidth(minWidth),

  position: (positionType: keyof typeof PositionType, node: Node) => node.setPositionType(Yoga.PositionType[positionType]),
  top: (top: Parameters<Node['setPosition']>[1], node: Node) => node.setPosition(Yoga.Edge.Top, top),
  right: (right: Parameters<Node['setPosition']>[1], node: Node) => node.setPosition(Yoga.Edge.Right, right),
  bottom: (bottom: Parameters<Node['setPosition']>[1], node: Node) => node.setPosition(Yoga.Edge.Bottom, bottom),
  left: (left: Parameters<Node['setPosition']>[1], node: Node) => node.setPosition(Yoga.Edge.Left, left),

  padding: (padding: Parameters<Node['setPadding']>[1], node: Node) => node.setPadding(Yoga.Edge.All, padding),
  paddingTop: (paddingTop: Parameters<Node['setPadding']>[1], node: Node) => node.setPadding(Yoga.Edge.Top, paddingTop),
  paddingRight: (paddingRight: Parameters<Node['setPadding']>[1], node: Node) => node.setPadding(Yoga.Edge.Right, paddingRight),
  paddingBottom: (paddingBottom: Parameters<Node['setPadding']>[1], node: Node) => node.setPadding(Yoga.Edge.Bottom, paddingBottom),
  paddingLeft: (paddingLeft: Parameters<Node['setPadding']>[1], node: Node) => node.setPadding(Yoga.Edge.Left, paddingLeft),

  margin: (margin: Parameters<Node['setMargin']>[1], node: Node) => node.setMargin(Yoga.Edge.All, margin),
  marginTop: (marginTop: Parameters<Node['setMargin']>[1], node: Node) => node.setMargin(Yoga.Edge.Top, marginTop),
  marginRight: (marginRight: Parameters<Node['setMargin']>[1], node: Node) => node.setMargin(Yoga.Edge.Right, marginRight),
  marginBottom: (marginBottom: Parameters<Node['setMargin']>[1], node: Node) => node.setMargin(Yoga.Edge.Bottom, marginBottom),
  marginLeft: (marginLeft: Parameters<Node['setMargin']>[1], node: Node) => node.setMargin(Yoga.Edge.Left, marginLeft),

  gap: (gap: Parameters<Node['setGap']>[1], node: Node) => node.setGap(Yoga.Gutter.All, gap),
  gapColumn: (gapColumn: Parameters<Node['setGap']>[1], node: Node) => node.setGap(Yoga.Gutter.Column, gapColumn),
  gapRow: (gapRow: Parameters<Node['setGap']>[1], node: Node) => node.setGap(Yoga.Gutter.Row, gapRow)
}

export type NodeProps = {
  [Key in keyof typeof propSetter]?: Parameters<(typeof propSetter)[Key]>[0]
}

const applyScaleFactor = (prop: any, scaleFactor: number) => {
  if (typeof prop === 'number') {
    return prop * scaleFactor
  }
  return prop
}

export const applyNodeProps = (node: Node, props: NodeProps, scaleFactor: number) => {
  return Object.entries(props).forEach(([key, value]) => {
    const scaledValue = applyScaleFactor(value, scaleFactor)
    propSetter[key as keyof typeof propSetter](scaledValue as never, node)
  })
}
