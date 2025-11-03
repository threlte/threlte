import type { Key, ThrelteUseTaskOptions } from '@threlte/core'
import type { EventListener } from 'three'
import { ViewportGizmo, type GizmoOptions } from 'three-viewport-gizmo'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { CameraControls } from 'camera-controls/dist/CameraControls.js'

export type Controls = OrbitControls | TrackballControls | InstanceType<typeof CameraControls>

type TaskOptions = Pick<ThrelteUseTaskOptions, 'after' | 'before' | 'stage'> & { key?: Key }

export type GizmoProps = GizmoOptions & {
  renderTask?: TaskOptions
  controls?: Controls
  ref?: ViewportGizmo
  onstart?: EventListener<unknown, 'start', ViewportGizmo>
  onchange?: EventListener<unknown, 'change', ViewportGizmo>
  onend?: EventListener<unknown, 'end', ViewportGizmo>
}
