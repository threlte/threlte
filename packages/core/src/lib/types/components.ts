import type { Object3D } from 'three'

export type HierarchicalObjectProperties = {
  object?: Object3D
  onChildMount?: (child: Object3D) => void
  onChildDestroy?: (child: Object3D) => void
}

export type DisposableThreeObject = {
  dispose?: () => void
  type?: string
} & Record<string, any>

export type DisposableObjectProperties = {
  object?: DisposableThreeObject
  dispose?: boolean
}

export type SceneGraphObjectProperties = {
  object: Object3D
}
