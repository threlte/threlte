import type { OmitProps, Props } from '@threlte/core'
import type { BufferGeometry, Camera, Group, Material, Object3D } from 'three'

export interface HTMLProps extends OmitProps<Props<Group, [{ render(): void }]>, 'pointerEvents'> {
  /**
   * Updates the element's position every frame. When `false`, call the
   * `render` function passed to the children snippet to update it yourself.
   * @default true
   */
  autoRender?: boolean

  /**
   * Applies the object's full 3D transform with CSS 3D transforms, so the
   * element rotates and scales in perspective. When `false`, the element
   * stays flat and faces the screen.
   * @default false
   */
  transform?: boolean

  /**
   * Computes the element's screen position from its object, the camera and
   * the canvas size. Ignored when `transform` is `true`.
   * @default projects the object's world position to screen pixels
   */
  calculatePosition?: (
    obj: Object3D,
    camera: Camera,
    size: { width: number; height: number }
  ) => [number, number]

  /**
   * The smallest change in screen position or camera zoom that updates the
   * element. Raise it to skip tiny updates.
   * @default 0.001
   */
  eps?: number

  /**
   * The CSS `z-index` range elements are spread across by distance to the
   * camera, from nearest to farthest.
   * @default [16777271, 0]
   */
  zIndexRange?: [number, number]

  /**
   * Keeps the element facing the camera when `transform` is `true`.
   * @default false
   */
  sprite?: boolean

  /**
   * The CSS `pointer-events` value of the element.
   * @default 'auto'
   */
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

  /**
   * Centers the element on its position instead of placing its top left
   * corner there.
   * @default false
   */
  center?: boolean

  /**
   * Stretches the element to cover the whole canvas.
   * @default false
   */
  fullscreen?: boolean

  /**
   * Scales the element with its distance to the camera, as if it were part
   * of the scene. Higher values make it larger. Without it, the element
   * keeps a constant size on screen.
   */
  distanceFactor?: number

  /**
   * The tag of the element the children are rendered into.
   * @default 'div'
   */
  as?: keyof HTMLElementTagNameMap

  /**
   * The element the HTML is appended to.
   * @default the canvas' parent element
   */
  portal?: HTMLElement

  /** CSS class of the outer wrapper element. */
  wrapperClass?: string

  /** CSS class of the inner element that holds the children. */
  class?: string

  /**
   * Hides the element when scene objects are in front of it. `true` or
   * `'raycast'` raycasts against the whole scene, and an array of objects
   * raycasts against only those. `'blending'` instead renders the element
   * behind the canvas with a transparent mesh in its place, so the scene
   * covers it with correct depth, including partial overlaps.
   * @default false
   */
  occlude?: boolean | Object3D[] | 'raycast' | 'blending'

  /**
   * Whether the element is currently visible, updated from occlusion every
   * frame. Bind to it to read the result. It can't be used to hide the
   * element.
   */
  visible?: boolean

  /**
   * Called when occlusion shows or hides the element. Setting it stops the
   * element's `display` from being toggled, so you can handle visibility
   * yourself, for example with a transition.
   */
  onvisibilitychange?: (visible: boolean) => void

  /**
   * Material of the mesh standing in for the element when `occlude` is
   * `'blending'`.
   */
  material?: Material

  /**
   * Geometry of the mesh standing in for the element when `occlude` is
   * `'blending'`.
   */
  geometry?: BufferGeometry

  /**
   * Whether the stand-in mesh used by `occlude: 'blending'` casts shadows.
   * @default false
   */
  castShadow?: boolean

  /**
   * Whether the stand-in mesh used by `occlude: 'blending'` receives shadows.
   * @default false
   */
  receiveShadow?: boolean
}
