import type { Component } from 'svelte'
import * as THREE from 'three/webgpu'
import TComp from '../components/T/T.svelte'
import type { Props } from '../components/T/types.js'
import { setIs } from '../components/T/utils/useIs.js'

type Extensions = Record<string, unknown>

type ThreeCatalogue = {
  [K in keyof typeof THREE]: (typeof THREE)[K]
}

type TComponentProxy = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [K in keyof ThreeCatalogue]: Component<Props<ThreeCatalogue[K]>, {}, 'ref'>
}

const catalogue: Extensions = {}

/**
 * Extends the WebGPU `three/webgpu` namespace and allows using custom Three.js
 * objects with `<T>` from `@threlte/core/webgpu`.
 *
 * This catalogue is independent of the one used by `@threlte/core`'s `extend`.
 */
export const extend = (extensions: Extensions) => {
  Object.assign(catalogue, extensions)
}

/**
 * ## `<T>` (WebGPU)
 *
 * Variant of Threlte's `<T>` whose name lookups resolve against `three/webgpu`,
 * so e.g. `<T.MeshStandardMaterial>` uses the WebGPU-native class rather than
 * the WebGL one, and the Node material classes (`MeshStandardNodeMaterial`,
 * etc.) are addressable directly.
 */
export const T = new Proxy(TComp, {
  get(_target, is: keyof typeof THREE) {
    if (typeof is !== 'string') {
      return Reflect.get(_target, is)
    }

    const module = catalogue[is] || THREE[is]

    if (module === undefined) {
      throw new Error(`No Three.js module found for ${is}. Did you forget to extend the catalogue?`)
    }

    return (...args: Parameters<typeof TComp>) => {
      setIs(module)
      return TComp(...args)
    }
  }
}) as typeof TComp &
  TComponentProxy & {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    [Key in keyof Threlte.UserCatalogue]: Component<Props<Threlte.UserCatalogue[Key]>, {}, 'ref'>
  } & Record<string, Component>
