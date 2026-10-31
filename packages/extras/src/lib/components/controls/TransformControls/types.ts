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

export interface TransformControlsProps
  extends
    Omit<
      RemoveIndexSignature<Props<TransformControls>>,
      'oncreate' | 'children' | keyof RemoveIndexSignature<Props<Group>>
    >,
    Props<Group> {
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

  /**
   * The object to transform. Without it, the controls transform their own
   * group, so the children move with it.
   */
  object?: Object3D

  /** @deprecated Use `bind:ref` instead. */
  group?: Group

  /** The underlying three.js `TransformControls` instance. */
  controls?: TransformControls
}
