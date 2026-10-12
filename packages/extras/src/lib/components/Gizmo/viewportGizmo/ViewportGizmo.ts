import {
  Matrix4,
  Mesh,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  Quaternion,
  Raycaster,
  Scene,
  Spherical,
  Timer,
  Vector2,
  Vector3,
  Vector4,
  type BufferGeometry,
  type MeshBasicMaterial,
  type Object3DEventMap,
  type WebGLRenderer
} from 'three'
import type { WebGPURenderer } from 'three/webgpu'
import {
  applyDepthFade,
  buildGizmoObjects,
  setBackgroundHover,
  setIndicatorHover,
  type Indicator
} from './indicators.js'
import {
  cameraDistance,
  dragThreshold,
  epsilon,
  orthographicExtent,
  perspectiveFov,
  turnRate
} from './constants.js'
import { resolveOptions, type GizmoOptions, type ResolvedOptions } from './options.js'
import { fromYUpSpace, toYUpSpace } from './upSpace.js'

export type { GizmoOptions, GizmoAxisOptions } from './options.js'

/** Controls the gizmo can drive directly. */
export type GizmoControls = {
  enabled: boolean
  target: Vector3
  update: () => void
  addEventListener: (type: 'change', listener: () => void) => void
  removeEventListener: (type: 'change', listener: () => void) => void
}

export interface ViewportGizmoEventMap extends Object3DEventMap {
  /** Fired when a view change interaction begins. */
  start: object
  /** Fired during view changes. */
  change: object
  /** Fired when a view change interaction completes. */
  end: object
}

const matrix = new Matrix4()
const spherical = new Spherical()
const pointerDelta = new Vector2()
const offset = new Vector3()
const direction = new Vector3()
const resolvedUp = new Vector3()
const currentUp = new Vector3()

const basisAxes = [
  new Vector3(1, 0, 0),
  new Vector3(-1, 0, 0),
  new Vector3(0, 1, 0),
  new Vector3(0, -1, 0),
  new Vector3(0, 0, 1),
  new Vector3(0, 0, -1)
]
const viewportTarget = new Vector4()
const raycaster = new Raycaster()
const pointer = new Vector2()

const applyPlacement = (element: HTMLElement, placement: string) => {
  const [vertical, horizontal] = placement.split('-')

  Object.assign(element.style, {
    left: horizontal === 'left' ? '0' : horizontal === 'center' ? '50%' : '',
    right: horizontal === 'right' ? '0' : '',
    top: vertical === 'top' ? '0' : vertical === 'bottom' ? '' : '50%',
    bottom: vertical === 'bottom' ? '0' : '',
    transform: `${horizontal === 'center' ? 'translateX(-50%)' : ''} ${
      vertical === 'center' ? 'translateY(-50%)' : ''
    }`
  })

  return placement
}

const applyBox = (element: HTMLElement, size: number, offset: ResolvedOptions['offset']) => {
  const { top, left, right, bottom } = offset

  Object.assign(element.style, {
    height: `${size}px`,
    width: `${size}px`,
    margin: `${top}px ${right}px ${bottom}px ${left}px`
  })
}

const applyDomElement = (
  element: HTMLElement,
  { placement, size, offset, id, className }: ResolvedOptions
) => {
  Object.assign(element.style, {
    position: 'absolute',
    zIndex: '1000',
    borderRadius: '100%'
  })

  applyBox(element, size, offset)
  applyPlacement(element, placement)

  if (id) {
    element.id = id
  }

  if (className) {
    element.className = className
  }

  return element
}

const resolveContainer = (container: HTMLElement | string) => {
  const element = typeof container === 'string' ? document.querySelector(container) : container

  if (!element) {
    throw new Error('<Gizmo>: invalid container element')
  }

  return element
}

const withinClickThreshold = (event: PointerEvent, start: Vector2) => {
  return (
    Math.abs(event.clientX - start.x) < dragThreshold &&
    Math.abs(event.clientY - start.y) < dragThreshold
  )
}

const intersectIndicators = (
  event: PointerEvent,
  rect: DOMRect,
  camera: OrthographicCamera | PerspectiveCamera,
  indicators: Indicator[]
) => {
  pointer.set(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  )
  raycaster.setFromCamera(pointer, camera)

  const [intersection] = raycaster.intersectObjects(indicators, false)

  return intersection?.object.visible ? intersection : null
}

/**
 * A camera orientation widget rendered into a corner of the viewport. Clicking
 * an axis animates the camera onto it; dragging orbits the camera around the
 * target.
 *
 * Built only from `Mesh`, `Sprite` and `CanvasTexture`, so a single
 * implementation serves both `WebGLRenderer` and `WebGPURenderer`.
 */
export class ViewportGizmo extends Object3D<ViewportGizmoEventMap> {
  /** Whether the gizmo is currently active and responding to user input. */
  enabled = true
  /** The camera being controlled by this gizmo. */
  camera: OrthographicCamera | PerspectiveCamera
  /** The renderer drawing the gizmo. */
  renderer: WebGLRenderer | WebGPURenderer
  /** The configuration options as supplied. */
  options: GizmoOptions = {}
  /** The point around which the camera rotates. */
  target = new Vector3()
  /** Whether view changes should be animated. */
  animated = true
  /** The speed of view change animations. */
  speed = 1
  /**
   * Whether the gizmo is currently animating a view change. Set internally;
   * useful when coordinating with another camera controller.
   */
  animating = false

  #options!: ResolvedOptions
  #indicators: Indicator[] = []
  #geometries = new Set<BufferGeometry>()
  #background: Mesh<BufferGeometry, MeshBasicMaterial> | null = null
  #viewport: [number, number, number, number] = [0, 0, 0, 0]
  #originalViewport: [number, number, number, number] = [0, 0, 0, 0]
  #originalScissor: [number, number, number, number] = [0, 0, 0, 0]
  #scene: Scene
  #camera!: OrthographicCamera | PerspectiveCamera
  #container!: Element
  #domElement!: HTMLElement
  #domRect!: DOMRect
  #dragging = false
  #distance = 0
  #timer = new Timer()
  #quaternionStart = new Quaternion()
  #quaternionEnd = new Quaternion()
  #pointerStart = new Vector2()
  #focus: Indicator | null = null
  #placement!: NonNullable<GizmoOptions['placement']>
  #controls?: GizmoControls
  #controlsListeners?: { start: () => void; end: () => void; change: () => void }

  constructor(
    camera: OrthographicCamera | PerspectiveCamera,
    renderer: WebGLRenderer | WebGPURenderer,
    options: GizmoOptions = {}
  ) {
    super()

    this.camera = camera
    this.renderer = renderer
    this.#scene = new Scene().add(this)

    this.set(options)
  }

  /** The current placement of the gizmo relative to its container. */
  get placement() {
    return this.#placement
  }

  set placement(placement: NonNullable<GizmoOptions['placement']>) {
    this.setLayout({ placement })
  }

  /** The widget's size in pixels. */
  get size() {
    return this.#options.size
  }

  set size(size: number) {
    this.setLayout({ size })
  }

  /** The widget's distance in pixels from its container's edges. */
  get offset() {
    return this.#options.offset
  }

  set offset(offset: Partial<ResolvedOptions['offset']>) {
    this.setLayout({ offset })
  }

  /**
   * Applies any of placement, size and offset together. The individual setters
   * delegate here, so prefer this when changing more than one: each pass reads
   * back the widget's rectangle, and batching keeps that to a single reflow.
   */
  setLayout(layout: {
    placement?: NonNullable<GizmoOptions['placement']>
    size?: number
    offset?: Partial<ResolvedOptions['offset']>
  }): this {
    const { placement, size, offset } = layout

    if (placement !== undefined) {
      this.#options.placement = placement
      this.#placement = applyPlacement(this.#domElement, placement) as NonNullable<
        GizmoOptions['placement']
      >
    }

    if (size !== undefined) {
      this.#options.size = size
    }

    if (offset !== undefined) {
      this.#options.offset = { ...this.#options.offset, ...offset }
    }

    if (size !== undefined || offset !== undefined) {
      applyBox(this.#domElement, this.#options.size, this.#options.offset)
    }

    this.domUpdate()

    return this
  }

  /** The element the widget is rendered into. */
  get domElement() {
    return this.#domElement
  }

  /**
   * Rebuilds the gizmo with new options. Expensive — not intended for use in an
   * animation loop. Prefer the dedicated accessors for anything they cover,
   * since those leave the gizmo's GPU resources in place.
   */
  set(options: GizmoOptions = {}): this {
    const controls = this.#controls

    this.dispose()

    this.options = options
    this.#options = resolveOptions(options, this.camera.up)
    this.#placement = this.#options.placement

    const { isSphere, size, container, animated, speed } = this.#options

    this.#camera = isSphere
      ? new OrthographicCamera(
          -orthographicExtent,
          orthographicExtent,
          orthographicExtent,
          -orthographicExtent,
          5,
          10
        )
      : new PerspectiveCamera(perspectiveFov, 1, 5, 10)
    this.#camera.position.set(0, 0, cameraDistance)

    // World units covered by one device-independent pixel of the widget, used to
    // give the axis lines a width in pixels.
    const worldHeight = isSphere
      ? orthographicExtent * 2
      : 2 * cameraDistance * Math.tan((perspectiveFov / 2) * (Math.PI / 180))

    const { interactive, background, lines, geometries } = buildGizmoObjects(
      this.#options,
      worldHeight / size
    )

    if (background) {
      this.add(background)
    }

    this.add(...lines, ...interactive)

    this.#background = background
    this.#indicators = interactive
    this.#geometries = geometries

    this.animated = animated
    this.speed = speed

    this.#container = container ? resolveContainer(container) : document.body

    // Reconfigured rather than replaced, so a reference held to `domElement`
    // survives a rebuild.
    this.#domElement ??= document.createElement('div')
    applyDomElement(this.#domElement, this.#options)
    this.#domElement.onpointerdown = (event) => this.#onPointerDown(event)
    this.#domElement.onpointermove = (event) => this.#onPointerMove(event)
    this.#domElement.onpointerleave = () => this.#onPointerLeave()
    this.#container.appendChild(this.#domElement)

    if (controls) {
      this.attachControls(controls)
    }

    this.update()
    this.#updateOrientation(true)

    return this
  }

  /**
   * Renders the gizmo into its corner of the viewport, restoring the renderer's
   * viewport and scissor afterwards.
   */
  render(): this {
    if (this.animating) {
      this.#animate()
    }

    const { renderer } = this
    const scissorTest = renderer.getScissorTest()
    const { autoClear } = renderer

    renderer.autoClear = false
    renderer.setViewport(...this.#viewport)

    if (scissorTest) {
      renderer.setScissor(...this.#viewport)
    }

    renderer.clear(false, true, false)
    renderer.render(this.#scene, this.#camera)

    renderer.setViewport(...this.#originalViewport)

    if (scissorTest) {
      renderer.setScissor(...this.#originalScissor)
    }

    renderer.autoClear = autoClear

    return this
  }

  /** Recomputes the gizmo's viewport rectangle from its DOM position. */
  domUpdate(): this {
    this.#domRect = this.#domElement.getBoundingClientRect()

    const { renderer } = this
    const rect = this.#domRect
    const canvas = renderer.domElement.getBoundingClientRect()
    const top = rect.top - canvas.top

    // WebGL's viewport origin is bottom-left, WebGPU's is top-left.
    const y =
      'isWebGPURenderer' in renderer && renderer.isWebGPURenderer
        ? top
        : renderer.domElement.clientHeight - (top + rect.height)

    this.#viewport = [rect.left - canvas.left, y, rect.width, rect.height]

    renderer.getViewport(viewportTarget).toArray(this.#originalViewport)

    if (renderer.getScissorTest()) {
      renderer.getScissor(viewportTarget).toArray(this.#originalScissor)
    }

    return this
  }

  /** Matches the gizmo's orientation to the camera. */
  cameraUpdate(): this {
    this.#updateOrientation()
    return this
  }

  /**
   * Updates both the DOM rectangle and the orientation.
   *
   * @param controls Internal. Pass `false` when the update originates from the
   * attached controls, to avoid recursing back into them.
   */
  update(controls = true): this {
    if (controls) {
      this.#controls?.update()
    }

    return this.domUpdate().cameraUpdate()
  }

  /** Connects controls to the gizmo, detaching any already attached. */
  attachControls(controls: GizmoControls): this {
    this.detachControls()

    this.target = controls.target
    this.#controlsListeners = {
      start: () => {
        controls.enabled = false
      },
      end: () => {
        controls.enabled = true
      },
      change: () => {
        this.update(false)
      }
    }

    this.addEventListener('start', this.#controlsListeners.start)
    this.addEventListener('end', this.#controlsListeners.end)
    controls.addEventListener('change', this.#controlsListeners.change)
    this.#controls = controls

    return this
  }

  /** Removes all controls listeners and references. Safe to call repeatedly. */
  detachControls(): this {
    if (!this.#controlsListeners || !this.#controls) {
      return this
    }

    this.target = new Vector3().copy(this.#controls.target)
    this.removeEventListener('start', this.#controlsListeners.start)
    this.removeEventListener('end', this.#controlsListeners.end)
    this.#controls.removeEventListener('change', this.#controlsListeners.change)
    this.#controlsListeners = undefined
    this.#controls = undefined

    return this
  }

  /** Frees geometries, materials, textures and listeners. */
  dispose() {
    this.detachControls()

    if (this.#domElement) {
      this.#domElement.onpointerdown = null
      this.#domElement.onpointermove = null
      this.#domElement.onpointerleave = null
      this.#domElement.remove()
    }

    for (const child of [...this.children]) {
      this.remove(child)

      const mesh = child as Mesh<BufferGeometry, MeshBasicMaterial>

      mesh.material?.map?.dispose()
      mesh.material?.dispose()
    }

    for (const geometry of this.#geometries) {
      geometry.dispose()
    }

    this.#geometries.clear()
  }

  #updateOrientation(fromCamera = true) {
    if (fromCamera) {
      this.quaternion.copy(this.camera.quaternion).invert()
      this.updateMatrixWorld()
    }

    applyDepthFade(this.#options, this.#indicators, this.camera)
  }

  /**
   * Advances the single orientation being interpolated and derives the camera
   * position from it. A `lookAt` rotation maps local +Z onto the direction from
   * the target to the eye, so position and orientation cannot drift apart.
   */
  #applyQuaternion(quaternion: Quaternion) {
    const { camera, target } = this

    camera.quaternion.copy(quaternion)
    direction.set(0, 0, 1).applyQuaternion(quaternion)
    camera.position.copy(target).addScaledVector(direction, this.#distance)
  }

  #animate() {
    if (!this.animated) {
      this.#applyQuaternion(this.#quaternionEnd)
      this.#updateOrientation()
      this.animating = false
      this.dispatchEvent({ type: 'change' })
      this.dispatchEvent({ type: 'end' })
      return
    }

    if (this.#controls) {
      this.#controls.enabled = false
    }

    const step = this.#timer.update().getDelta() * turnRate * this.speed

    this.#quaternionStart.rotateTowards(this.#quaternionEnd, step)
    this.#applyQuaternion(this.#quaternionStart)
    this.#updateOrientation()

    requestAnimationFrame(() => this.dispatchEvent({ type: 'change' }))

    if (this.#quaternionStart.angleTo(this.#quaternionEnd) < epsilon) {
      if (this.#controls) {
        this.#controls.enabled = true
      }

      this.animating = false
      this.dispatchEvent({ type: 'end' })
    }
  }

  /**
   * Picks the up vector for a camera looking along `direction`.
   *
   * The scene's own up works for every direction except one parallel to it,
   * where `lookAt` is degenerate and any roll is geometrically valid. Rolling to
   * wherever the camera happens to sit would leave a pole view tilted, so snap
   * to the world axis that both squares the view up and sits closest to the
   * camera's current screen-up — axis-aligned, and without an avoidable spin.
   */
  #resolveUp(direction: Vector3, from: Quaternion) {
    const sceneUp = this.camera.up

    if (Math.abs(direction.dot(sceneUp)) < 1 - epsilon) {
      return sceneUp
    }

    currentUp.set(0, 1, 0).applyQuaternion(from)

    let bestAlignment = -Infinity

    for (const axis of basisAxes) {
      if (Math.abs(axis.dot(direction)) > 1 - epsilon) {
        continue
      }

      const alignment = axis.dot(currentUp)

      if (alignment > bestAlignment) {
        bestAlignment = alignment
        resolvedUp.copy(axis)
      }
    }

    return resolvedUp
  }

  #setOrientation(axis: Vector3) {
    const { camera, target } = this

    this.#distance = camera.position.distanceTo(target)

    // The camera's own orientation, not a reconstruction of it: any difference
    // in roll between the two would show up as a jump on the first frame.
    this.#quaternionStart.copy(camera.quaternion)

    direction.copy(axis).normalize()
    offset.copy(target).addScaledVector(direction, this.#distance)
    matrix.lookAt(offset, target, this.#resolveUp(direction, this.#quaternionStart))
    this.#quaternionEnd.setFromRotationMatrix(matrix)

    this.animating = true
    this.#timer.reset()
    this.dispatchEvent({ type: 'start' })
  }

  #onPointerDown(event: PointerEvent) {
    if (!this.enabled || this.animating) {
      return
    }

    event.preventDefault()
    this.#pointerStart.set(event.clientX, event.clientY)

    const start = spherical.setFromVector3(
      toYUpSpace(offset.subVectors(this.camera.position, this.target), this.camera.up)
    )
    const { theta, phi } = start
    this.#distance = start.radius

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!this.#dragging) {
        if (withinClickThreshold(moveEvent, this.#pointerStart)) {
          return
        }

        this.#dragging = true
      }

      const delta = pointerDelta
        .set(moveEvent.clientX, moveEvent.clientY)
        .sub(this.#pointerStart)
        .multiplyScalar((1 / this.#domRect.width) * Math.PI)

      const current = spherical.setFromVector3(
        toYUpSpace(offset.subVectors(this.camera.position, this.target), this.camera.up)
      )

      current.theta = theta - delta.x
      current.phi = Math.max(epsilon, Math.min(Math.PI - epsilon, phi - delta.y))

      fromYUpSpace(this.camera.position.setFromSpherical(current), this.camera.up).add(this.target)
      this.camera.lookAt(this.target)
      this.quaternion.copy(this.camera.quaternion).invert()
      this.#updateOrientation(false)
      this.dispatchEvent({ type: 'change' })
    }

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove, false)
      document.removeEventListener('pointerup', onPointerUp, false)

      if (!this.#dragging) {
        this.#handleClick(event)
        return
      }

      if (this.#focus) {
        setIndicatorHover(this.#focus, false)
        this.#focus = null
      }

      this.#dragging = false
      this.dispatchEvent({ type: 'end' })
    }

    document.addEventListener('pointermove', onPointerMove, false)
    document.addEventListener('pointerup', onPointerUp, false)
    this.dispatchEvent({ type: 'start' })
  }

  #onPointerMove(event: PointerEvent) {
    if (!this.enabled || this.#dragging) {
      return
    }

    if (this.#background) {
      setBackgroundHover(this.#background, true)
    }

    this.#handleHover(event)
  }

  #onPointerLeave() {
    if (!this.enabled || this.#dragging) {
      return
    }

    if (this.#background) {
      setBackgroundHover(this.#background, false)
    }

    if (this.#focus) {
      setIndicatorHover(this.#focus, false)
      this.#focus = null
    }

    this.#domElement.style.cursor = ''
  }

  #handleClick(event: PointerEvent) {
    const intersection = intersectIndicators(event, this.#domRect, this.#camera, this.#indicators)

    if (this.#focus) {
      setIndicatorHover(this.#focus, false)
      this.#focus = null
    }

    if (intersection) {
      this.#setOrientation(intersection.object.position)
      this.dispatchEvent({ type: 'change' })
    }
  }

  #handleHover(event: PointerEvent) {
    const intersection = intersectIndicators(event, this.#domRect, this.#camera, this.#indicators)
    const hovered = (intersection?.object as Indicator | undefined) ?? null

    if (this.#focus === hovered) {
      return
    }

    this.#domElement.style.cursor = hovered ? 'pointer' : ''

    if (this.#focus) {
      setIndicatorHover(this.#focus, false)
    }

    this.#focus = hovered

    if (hovered) {
      setIndicatorHover(hovered, true)
    } else {
      applyDepthFade(this.#options, this.#indicators, this.camera)
    }
  }
}
