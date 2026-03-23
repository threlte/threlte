import { useThrelte, type ThrelteContext } from '@threlte/core'
import {
  Box2,
  Box3,
  Mesh,
  PerspectiveCamera,
  Vector2,
  Vector3,
  type Camera,
  type Object3D,
  type WebGLRenderer
} from 'three'
import type { Mask } from '../Mask'

/**
 * Mask for a tour stop that uses a Three.js object as a mask. The mask tracks
 * the position and size of the object.
 */
export class MaskThreeObject implements Mask {
  public box2d = new Box2()

  private ctx: ThrelteContext<WebGLRenderer>

  constructor(
    public readonly object: Mesh,
    public readonly shape: Required<Mask>['spotlight']['shape'],
    public readonly padding: Required<Mask>['spotlight']['padding'] = 0,
    public readonly blockPointer: Mask['blockPointer'] = 'mask',
    public readonly darkenBackground: Mask['darkenBackground'] = true,
    public readonly spotlightVisible = true
  ) {
    this.ctx = useThrelte()
  }

  min(v2: Vector2, v3: Vector3): void {
    if (v2.x > v3.x) v2.x = v3.x
    if (v2.y > v3.y) v2.y = v3.y
  }

  max(v2: Vector2, v3: Vector3): void {
    if (v2.x < v3.x) v2.x = v3.x
    if (v2.y < v3.y) v2.y = v3.y
  }

  computeScreenSpaceBoundingBox(mesh: Mesh, camera: PerspectiveCamera): Box2 {
    if (!mesh.geometry || !('position' in mesh.geometry.attributes)) return new Box2()
    const pos = mesh.geometry.attributes.position
    const vertex = new Vector3()

    var min = new Vector2(1, 1)
    var max = new Vector2(-1, -1)

    mesh.updateMatrix()
    mesh.updateWorldMatrix(true, false)
    camera.updateMatrix()
    camera.updateWorldMatrix(true, false)
    camera.updateProjectionMatrix()

    for (let i = 0; i < pos.count * pos.itemSize; i += pos.itemSize) {
      vertex.set(pos.array[i]!, pos.array[i + 1]!, pos.array[i + 2]!)
      const vertexWorldCoord = vertex.applyMatrix4(mesh.matrixWorld)
      const vertexScreenSpace = vertexWorldCoord.project(camera).normalize()
      this.min(min, vertexScreenSpace)
      this.max(max, vertexScreenSpace)
    }

    return new Box2(min, max)
  }

  normalizedToPixels(coord: Box2, renderWidthPixels: number, renderHeightPixels: number) {
    const halfScreen = new Vector2(renderWidthPixels / 2, renderHeightPixels / 2)
    const cloned = coord.clone()
    cloned.min.multiply(halfScreen).add(halfScreen)
    cloned.max.multiply(halfScreen).add(halfScreen)
    return cloned
  }

  initialize(): void {
    const output = this.getScreenSpaceBoundingBox(
      this.object,
      this.ctx.camera.current,
      this.ctx.renderer
    )

    this.box2d.min.copy(output.min)
    this.box2d.max.copy(output.max)
  }

  getBoundingBox(obj: Object3D): Box3 {
    const box = new Box3()
    box.setFromObject(obj)
    return box
  }

  getScreenSpaceBoundingBox(
    obj: Object3D,
    camera: Camera,
    renderer: WebGLRenderer
  ): { min: Vector2; max: Vector2 } {
    const boundingBox = this.getBoundingBox(obj)

    const vertices = [
      new Vector3(boundingBox.min.x, boundingBox.min.y, boundingBox.min.z),
      new Vector3(boundingBox.min.x, boundingBox.min.y, boundingBox.max.z),
      new Vector3(boundingBox.min.x, boundingBox.max.y, boundingBox.min.z),
      new Vector3(boundingBox.min.x, boundingBox.max.y, boundingBox.max.z),
      new Vector3(boundingBox.max.x, boundingBox.min.y, boundingBox.min.z),
      new Vector3(boundingBox.max.x, boundingBox.min.y, boundingBox.max.z),
      new Vector3(boundingBox.max.x, boundingBox.max.y, boundingBox.min.z),
      new Vector3(boundingBox.max.x, boundingBox.max.y, boundingBox.max.z)
    ]

    const min = new Vector2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)
    const max = new Vector2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)

    vertices.forEach((vertex) => {
      const vector = vertex.clone().project(camera)

      const widthHalf = 0.5 * renderer.domElement.offsetWidth
      const heightHalf = 0.5 * renderer.domElement.offsetHeight

      vector.x = vector.x * widthHalf + widthHalf
      vector.y = -(vector.y * heightHalf) + heightHalf

      min.x = Math.min(min.x, vector.x)
      min.y = Math.min(min.y, vector.y)
      max.x = Math.max(max.x, vector.x)
      max.y = Math.max(max.y, vector.y)
    })

    return { min, max }
  }

  update(): void {
    const output = this.getScreenSpaceBoundingBox(
      this.object,
      this.ctx.camera.current,
      this.ctx.renderer
    )

    this.box2d.min.copy(output.min)
    this.box2d.max.copy(output.max)
  }

  get spotlight() {
    return {
      visible: this.spotlightVisible,
      left: this.box2d.min.x,
      top: this.box2d.min.y,
      width: this.box2d.max.x - this.box2d.min.x,
      height: this.box2d.max.y - this.box2d.min.y,
      padding: this.padding,
      shape: this.shape
    }
  }
}
