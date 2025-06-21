/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { Component } from 'svelte'
import * as THREE from 'three'
import TComp from './T.svelte'
import type { Props } from './types'
import { setIs } from './utils/useIs'

type ThreeCatalogue = {
  [K in keyof typeof THREE]: (typeof THREE)[K]
}

type ExtendedCatalogue = ThreeCatalogue & Record<string, unknown>

type TComponentProxy = {
  [K in keyof ExtendedCatalogue]: Component<Props<ExtendedCatalogue[K]>, {}, 'ref'>
}

const catalogue: Partial<Threlte.UserCatalogue> = {}

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
export function extend<const T extends Partial<Threlte.UserCatalogue>>(extensions: T): void {
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
  get(_target, is: string) {
    const module = catalogue[is] || (THREE as any)[is]

    if (!module) {
      throw new Error(`No Three.js module found for "${is}". Did you forget to call extend()?`)
    }

    setIs(module)
    return TComp
  }
}) as typeof TComp & TComponentProxy
