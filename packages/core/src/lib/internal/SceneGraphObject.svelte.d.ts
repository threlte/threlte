import type { Snippet, SvelteComponent } from 'svelte'
import type { Object3D } from 'three'

export type SceneGraphObjectProperties = {
  object: Object3D
  children: Snippet
}

export default class SceneGraphObject extends SvelteComponent<SceneGraphObjectProperties> {}
