import type {
  Align,
  DirtiedFunction,
  Display,
  Edge,
  FlexDirection,
  Gutter,
  Justify,
  MeasureFunction,
  Overflow,
  PositionType,
  Wrap
} from 'yoga-layout'

export type Axis = 'x' | 'y' | 'z'

export type FlexPlane = 'xy' | 'yz' | 'xz'

// export type NodeProps = {
//   alignContent?: Align
//   alignItems?: Align
//   alignSelf?: Align
//   aspectRatio?: number
//   border?: [edge: Edge, borderWidth: number]
//   display?: Display
//   flex?: number
//   flexBasis?: number | 'auto' | `${number}%`
//   flexBasisPercent?: number
//   flexBasisAuto?: true
//   flexDirection?: FlexDirection
//   flexGrow?: number
//   flexShrink?: number
//   flexWrap?: Wrap
//   height?: number | 'auto' | `${number}%`
//   isReferenceBaseline?: boolean
//   heightAuto?: true
//   heightPercent?: number
//   justifyContent?: Justify
//   gap?: [gutter: Gutter, gapLength: number]
//   margin?: [edge: Edge, margin: number | 'auto' | `${number}%`]
//   marginAuto?: Edge
//   marginPercent?: [edge: Edge, margin: number]
//   maxHeight?: number | `${number}%`
//   maxHeightPercent?: number
//   maxWidth?: number | `${number}%`
//   maxWidthPercent?: number
//   dirtiedFunc?: DirtiedFunction | null
//   measureFunc?: MeasureFunction | null
//   minHeight?: number | `${number}%`
//   minHeightPercent?: number
//   minWidth?: number | `${number}%`
//   minWidthPercent?: number
//   overflow?: Overflow
//   padding?: [edge: Edge, padding: number | `${number}%`]
//   paddingPercent?: [edge: Edge, padding: number]
//   position?: [edge: Edge, position: number | `${number}%`]
//   positionPercent?: [edge: Edge, position: number]
//   positionType?: PositionType
//   width?: [width: number | 'auto' | `${number}%`]
//   widthAuto?: true
//   widthPercent?: number
// }
