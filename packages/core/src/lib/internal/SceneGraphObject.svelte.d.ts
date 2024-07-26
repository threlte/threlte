import type { Snippet, Component } from 'svelte'
import type { Object3D } from 'three'

export type SceneGraphObjectProperties = {
  object: Object3D
  children: Snippet
}

declare const SceneGraphObject: Component<SceneGraphObjectProperties>
export default SceneGraphObject
