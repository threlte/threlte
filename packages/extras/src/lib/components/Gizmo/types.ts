import type { Key, ThrelteUseTaskOptions } from '@threlte/core'
import type { EventListener } from 'three'
import { ViewportGizmo, type GizmoOptions } from 'three-viewport-gizmo'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import type CameraControls from 'camera-controls'

export type Controls = OrbitControls | TrackballControls | InstanceType<typeof CameraControls>

type TaskOptions = Pick<ThrelteUseTaskOptions, 'after' | 'before' | 'stage'> & { key?: Key }

export type GizmoProps = GizmoOptions & {
  /** Options for the task to render the gizmo scene in the viewport. By default, this happens after the `autoRenderTask`. */
  renderTask?: TaskOptions
  controls?: OrbitControls | TrackballControls | CameraControls
  ref?: ViewportGizmo
  /** Triggered when a view change interaction begins. */
  onstart?: EventListener<unknown, 'start', ViewportGizmo>
  /** Triggered during view changes. */
  onchange?: EventListener<unknown, 'change', ViewportGizmo>
  /** Triggered when a view change interaction ends. */
  onend?: EventListener<unknown, 'end', ViewportGizmo>
}
