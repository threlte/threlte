import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { ShaderMaterial, ColorRepresentation } from 'three'

export type FakeGlowMaterialProps = Props<ShaderMaterial> & {
  falloff?: number
  glowInternalRadius?: number
  glowColor?: ColorRepresentation
  glowSharpness?: number
}

export default class FakeGlowMaterial extends SvelteComponent<FakeGlowMaterialProps> {}
