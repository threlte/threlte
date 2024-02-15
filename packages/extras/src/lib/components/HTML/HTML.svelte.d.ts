import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Camera, Group, Object3D } from 'three'

export type HTMLProps = Props<Group> & {
  transform?: boolean
  calculatePosition?: (
    obj: Object3D,
    camera: Camera,
    size: { width: number; height: number }
  ) => [number, number]
  eps?: number
  occlude?: boolean | Object3D[]
  zIndexRange?: [number, number]
  sprite?: boolean
  pointerEvents?:
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
  center?: boolean
  fullscreen?: boolean
  distanceFactor?: number
  as?: keyof HTMLElementTagNameMap
  portal?: HTMLElement
}

export type HTMLEvents = Events<Group>

export type HTMLSlots = {
  threlte: Slots<Group>['default']
  // eslint-disable-next-line @typescript-eslint/ban-types
  default: {}
}

export default class HTML extends SvelteComponent<HTMLProps, HTMLEvents, HTMLSlots> {}
