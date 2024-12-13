import type { Key, ThrelteUseTaskOptions } from '@threlte/core'
import type { EventListener } from 'three'
import { ViewportGizmo, type GizmoOptions } from 'three-viewport-gizmo'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

type TaskOptions = Pick<ThrelteUseTaskOptions, 'after' | 'before' | 'stage'> & { key?: Key }

export type GizmoProps = GizmoOptions & {
  renderTask?: TaskOptions
  controls?: OrbitControls
  ref: ViewportGizmo
  onstart?: EventListener<{}, 'start', ViewportGizmo>
  onchange?: EventListener<{}, 'change', ViewportGizmo>
  onend?: EventListener<{}, 'end', ViewportGizmo>
}
