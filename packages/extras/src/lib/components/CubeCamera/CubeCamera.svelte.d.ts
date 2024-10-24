import type { FogBase, Texture, Group } from 'three'
import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type CubeCameraProps = Props<Group> & {
  resolution?: number
  near?: number
  far?: number
  envMap?: Texture
  fog?: FogBase
  frames?: number
}

export default class CubeCamera extends SvelteComponent<CubeCameraProps> {}
