import type { SvelteComponent } from 'svelte'
import type { Object3D } from 'three'

export type SceneGraphObjectProperties = {
  object: Object3D
}

export default class SceneGraphObject extends SvelteComponent<SceneGraphObjectProperties> {}
