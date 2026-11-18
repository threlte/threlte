import type { Key, ThrelteUseTaskOptions } from '@threlte/core'
import type { EventListener } from 'three'
import { ViewportGizmo, type GizmoOptions } from './viewportGizmo/index.js'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import type CameraControls from 'camera-controls'

export type Controls = OrbitControls | TrackballControls | InstanceType<typeof CameraControls>

type TaskOptions = Pick<ThrelteUseTaskOptions, 'after' | 'before' | 'stage'> & { key?: Key }

export interface GizmoProps extends GizmoOptions {
  /**
   * Options for the task that renders the gizmo into the viewport, such as
   * the stage it runs in or which task it runs before or after.
   * @default { after: autoRenderTask }
   */
  renderTask?: TaskOptions

  /**
   * The camera controls the gizmo stays in sync with, so clicking an axis
   * also moves the controls' target.
   * @default the parent controls
   */
  controls?: Controls

  /** The underlying `ViewportGizmo` instance. */
  ref?: ViewportGizmo

  /**
   * Parent element for the gizmo, as an element or a CSS selector.
   * @default the canvas' parent element
   */
  container?: HTMLElement | string

  /**
   * Size of the gizmo in pixels.
   * @default 86
   */
  size?: number

  /**
   * Where the gizmo sits within its container.
   * @default 'bottom-left'
   */
  placement?: GizmoOptions['placement']

  /** Called when the user starts changing the view through the gizmo. */
  onstart?: EventListener<unknown, 'start', ViewportGizmo>

  /** Called on every frame of a view change. */
  onchange?: EventListener<unknown, 'change', ViewportGizmo>

  /** Called when a view change through the gizmo ends. */
  onend?: EventListener<unknown, 'end', ViewportGizmo>
}
