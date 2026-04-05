import type { Component } from 'svelte'
import * as THREE from 'three'
import TComp from './T.svelte'
import type { Props } from './types.js'
import { setIs } from './utils/useIs.js'

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
 * Extends the default THREE namespace and allows using custom Three.js objects with `<T>`.
 *
 * @example
 * ```svelte
 * <script>
 * 	import { extend, T } from 'threlte'
 * 	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
 *
 * 	extend({ OrbitControls })
 * </script>
 *
 * <T.OrbitControls />
 * ```
 */
export const extend = (extensions: Extensions) => {
  Object.assign(catalogue, extensions)
}

/**
 * ## `<T>`
 *
 * Threlte's `<T>` component is a wrapper around Three.js objects. It is a generic component that can be used to create any Three.js object.
 *
 * @example
 *
 * ```svelte
 * <script>
 * 	import { T } from 'threlte'
 * </script>
 *
 * <T.PerspectiveCamera makeDefault />
 *
 * <T.Mesh>
 * 	<T.BoxGeometry />
 * 	<T.MeshBasicMaterial color="red" />
 * </T.Mesh>
 * ```
 */
export const T = new Proxy(TComp, {
  get(_target, is: keyof typeof THREE) {
    // Forward non-string keys (Symbols) to the underlying component.
    // Returning TComp directly (what we previously did) for symbols
    // caused Svelte 5.53+ DEV mode to accidentally call TComp via
    // internal symbol lookups (PROXY_PATH_SYMBOL).
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
