import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ShaderMaterial } from 'three'

export type MeshDiscardMaterialProps = Omit<
  Props<ShaderMaterial>,
  'fragmentShader' | 'vertexShader'
>
export default class MeshDiscardMaterial extends SvelteComponent<MeshDiscardMaterialProps> {}
