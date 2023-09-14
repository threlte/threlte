import type { Align, FlexDirection, Justify, Node, PositionType, Wrap } from 'yoga-layout'
import * as Yoga from 'yoga-layout'
import { alignFlexProps } from './alignFlexProps'

export type FlexPlane = 'xy' | 'yz' | 'xz'

export type Axis = 'x' | 'y' | 'z'

// prettier-ignore
/**
 * This map provides the prop setters as well as the types for the props. The
 * first input of a setter is used as the prop value. The second input is the
 * node to apply the prop to. The value of a prop needs to be a primitive type,
 * so that it can be trivially compared to the previous value. This is used to
 * prevent unnecessary reflows.
 */
export const propSetter = {
  alignItems: (align: keyof typeof Align, node: Node) => node.setAlignItems(Yoga.Align[align]),
  alignSelf: (align: keyof typeof Align, node: Node) => node.setAlignSelf(Yoga.Align[align]),
  alignContent: (align: keyof typeof Align, node: Node) => node.setAlignContent(Yoga.Align[align]),

  justifyContent: (justify: keyof typeof Justify, node: Node) => node.setJustifyContent(Yoga.Justify[justify]),

	flexDirection: (dir: keyof typeof FlexDirection, node: Node) => node.setFlexDirection(Yoga.FlexDirection[dir]),

  flexWrap: (wrap: keyof typeof Wrap, node: Node) => node.setFlexWrap(Yoga.Wrap[wrap]),

	flex: (flex: Parameters<Node['setFlex']>[0], node: Node) => node.setFlex(flex),
  flexBasis: (basis: Parameters<Node['setFlexBasis']>[0], node: Node) => node.setFlexBasis(basis),
  flexGrow: (grow: Parameters<Node['setFlexGrow']>[0], node: Node) => node.setFlexGrow(grow),
  flexShrink: (shrink: Parameters<Node['setFlexShrink']>[0], node: Node) => node.setFlexShrink(shrink),

  height: (height: Parameters<Node['setHeight']>[0], node: Node) => node.setHeight(height),
  width: (width: Parameters<Node['setWidth']>[0], node: Node) => node.setWidth(width),
  maxHeight: (maxHeight: Parameters<Node['setMaxHeight']>[0], node: Node) => node.setMaxHeight(maxHeight),
  maxWidth: (maxWidth: Parameters<Node['setMaxWidth']>[0], node: Node) => node.setMaxWidth(maxWidth),
  minHeight: (minHeight: Parameters<Node['setMinHeight']>[0], node: Node) => node.setMinHeight(minHeight),
  minWidth: (minWidth: Parameters<Node['setMinWidth']>[0], node: Node) => node.setMinWidth(minWidth),

	/** As of now, this won't work since the bounding box is still computed by nodes marked as absolutely positioned  */
  // position: (positionType: keyof typeof PositionType, node: Node) => node.setPositionType(Yoga.PositionType[positionType]),
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
  gapRow: (gapRow: Parameters<Node['setGap']>[1], node: Node) => node.setGap(Yoga.Gutter.Row, gapRow),

	aspectRatio: (aspectRatio: Parameters<Node['setAspectRatio']>[0], node: Node) => node.setAspectRatio(aspectRatio),
}

export type NodeProps = {
  [Key in keyof typeof propSetter]?: Parameters<(typeof propSetter)[Key]>[0]
}

/**
 * Applies scale factor to props that are numbers. This is used to scale the
 * props to the current scale factor of the root node because yoga-layout
 * is made to work with integer values.
 */
const applyScaleFactor = (prop: any, scaleFactor: number) => {
  if (typeof prop === 'number') {
    return prop * scaleFactor
  }
  return prop
}

export const applyNodeProps = (node: Node, props: NodeProps, scaleFactor: number) => {
  return Object.entries(alignFlexProps(props)).forEach(([key, value]) => {
    const scaledValue = applyScaleFactor(value, scaleFactor)
    propSetter[key as keyof typeof propSetter](scaledValue as never, node)
  })
}
