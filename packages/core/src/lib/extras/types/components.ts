import type { GroupProperties, LineSegmentsProperties } from '../../types/components'
import type { Camera, ColorRepresentation, Material, Object3D } from 'three'

export type EdgesProperties = Omit<LineSegmentsProperties, 'geometry' | 'material'> &
  (
    | {
        color?: ColorRepresentation
        material: never
      }
    | {
        material?: Material | Material[]
        color: never
      }
  ) & {
    threshold?: number
  }

export type HTMLProperties = GroupProperties & {
  transform?: boolean
  calculatePosition: (
    obj: Object3D,
    camera: Camera,
    size: { width: number; height: number }
  ) => [number, number]
  eps: number
  occlude: boolean | Object3D[]
  zIndexRange: [number, number]
  sprite: boolean
  pointerEvents:
    | 'auto'
    | 'none'
    | 'visiblePainted'
    | 'visibleFill'
    | 'visibleStroke'
    | 'visible'
    | 'painted'
    | 'fill'
    | 'stroke'
    | 'all'
    | 'inherit'
  center: boolean
  fullscreen: boolean
  distanceFactor?: number
  as: keyof HTMLElementTagNameMap
  portal?: HTMLElement
}

export type FloatProperties = GroupProperties & {
  speed: number
  rotationIntensity: number
  floatIntensity: number
  floatingRange: [number, number]
}
