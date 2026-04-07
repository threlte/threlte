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
     * Automatically pause any registered camera controls (OrbitControls,
     * TrackballControls, CameraControls) while dragging. @default true
     */
    autoPauseControls?: boolean

    /** @deprecated Use `autoPauseControls` instead. */
    autoPauseOrbitControls?: boolean

    /** @deprecated Use `autoPauseControls` instead. */
    autoPauseTrackballControls?: boolean

    /**
     * An arbitrary camera controls instance to pause while dragging.
     * Any object with an `enabled` property works (e.g. a custom controls class).
     * Built-in @threlte/extras components (<OrbitControls>, <TrackballControls>, <CameraControls>) are
     * handled automatically — this prop is only needed for third-party controls.
     */
    cameraControls?: { enabled: boolean }

    object?: Object3D
    group?: Group
    controls?: TransformControls
  }
