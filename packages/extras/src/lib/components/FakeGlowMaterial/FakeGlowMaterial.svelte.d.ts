import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ShaderMaterial, ColorRepresentation } from 'three'

export type FakeGlowMaterialProps = Props<ShaderMaterial> & {
  falloff?: number
  glowInternalRadius?: number
  glowColor?: ColorRepresentation
  glowSharpness?: number
}

export type FakeGlowMaterialEvents = Events<ShaderMaterial>
export type FakeGlowMaterialSlots = Slots<ShaderMaterial>

export default class FakeGlowMaterial extends SvelteComponent<
  FakeGlowMaterialProps,
  FakeGlowMaterialEvents,
  FakeGlowMaterialSlots
> {}
