import type { Events, Props } from '@threlte/core'
import type { Snippet, SvelteComponent } from 'svelte'
import type { ShaderMaterial, ColorRepresentation } from 'three'

export type FakeGlowMaterialProps = Props<ShaderMaterial> & {
  falloff?: number
  glowInternalRadius?: number
  glowColor?: ColorRepresentation
  glowSharpness?: number
  children?: FakeGlowMaterialSnippet
}

export type FakeGlowMaterialEvents = Events<ShaderMaterial>
export type FakeGlowMaterialSnippet = Snippet<[{ ref: ShaderMaterial }]>

export default class FakeGlowMaterial extends SvelteComponent<
  FakeGlowMaterialProps,
  FakeGlowMaterialEvents
> {}
