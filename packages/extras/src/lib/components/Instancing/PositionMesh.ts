import { isInstanceOf, type CurrentWritable } from '@threlte/core'
import {
  BufferGeometry,
  Color,
  FrontSide,
  Group,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Raycaster,
  type InstancedMesh,
  type Intersection
} from 'three'

const _instanceLocalMatrix = new Matrix4()
const _instanceWorldMatrix = new Matrix4()
const _instanceIntersects: Intersection[] = []
const _mesh = new Mesh<BufferGeometry, MeshBasicMaterial>()

export class PositionMesh extends Group {
  color: Color
  instancedMesh: CurrentWritable<InstancedMesh | undefined>
  instances: CurrentWritable<PositionMesh[]>

  constructor(
    instancedMesh: CurrentWritable<InstancedMesh>,
    instances: CurrentWritable<PositionMesh[]>
  ) {
    super()
    this.color = new Color('white')
    this.instancedMesh = instancedMesh
    this.instances = instances
  }

  // This will allow the virtual instance have bounds
  get geometry(): BufferGeometry | undefined {
    return this.instancedMesh.current?.geometry
  }

  // And this will allow the virtual instance to receive events
  override raycast(raycaster: Raycaster, intersects: Intersection[]): void {
    const parent = this.instancedMesh.current

    if (parent === undefined) return

    if (parent.geometry === undefined || parent.material === undefined) return

    _mesh.geometry = parent.geometry
    const matrixWorld = parent.matrixWorld
    const instanceId = this.instances.current.indexOf(this)

    // If the instance wasn't found or exceeds the parents draw range, bail out
    if (instanceId === -1 || instanceId > parent.count) return

    // calculate the world matrix for each instance
    parent.getMatrixAt(instanceId, _instanceLocalMatrix)
    _instanceWorldMatrix.multiplyMatrices(matrixWorld, _instanceLocalMatrix)

    // the mesh represents this single instance
    _mesh.matrixWorld = _instanceWorldMatrix

    // raycast side according to instance material
    if (isInstanceOf(parent.material, 'Material')) {
      _mesh.material.side = parent.material.side
    } else {
      _mesh.material.side = parent.material[0]?.side ?? FrontSide
    }

    _mesh.raycast(raycaster, _instanceIntersects)

    // process the result of raycast
    for (let i = 0, l = _instanceIntersects.length; i < l; i++) {
      const intersect = _instanceIntersects[i]
      intersect.instanceId = instanceId
      intersect.object = this
      intersects.push(intersect)
    }

    _instanceIntersects.length = 0
  }
}
