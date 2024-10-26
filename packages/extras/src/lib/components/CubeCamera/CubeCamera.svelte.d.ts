import type { Group, Scene } from 'three'
import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type CubeCameraProps = Props<Group> & {
  background?: Scene['background'] | 'auto'
  far?: number
  fog?: Scene['fog']
  frames?: number
  near?: number
  resolution?: number
}

export default class CubeCamera extends SvelteComponent<CubeCameraProps> {}
