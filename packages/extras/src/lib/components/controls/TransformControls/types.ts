import type { Props } from '@threlte/core'
import type { Group, Object3D } from 'three'
import type { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K]
}

export type TransformControlsProps = Omit<
  RemoveIndexSignature<Props<TransformControls>>,
  'oncreate' | 'children'
> &
  Props<Group> & {
    /**
     * @default true
     */
    autoPauseOrbitControls?: boolean

    /**
     * @default true
     */
    autoPauseTrackballControls?: boolean

    object?: Object3D
    group?: Group
    controls?: TransformControls
  }
