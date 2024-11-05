import type { Component } from 'svelte'
import * as THREE from 'three'
import TComp from './T.svelte'
import type { Props } from './types'
import { setIs } from './utils/useIs'

type Extensions = Record<string, unknown>

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
export const T = new Proxy(function () {}, {
  apply(_target, _thisArg, argArray: [internal: unknown, props: { is: unknown }]) {
    return TComp(...argArray)
  },
  get(_target, is: keyof typeof THREE) {
    // Handle snippets
    if (typeof is !== 'string') {
      return TComp
    }

    const module = catalogue[is] || THREE[is]

    if (module === undefined) {
      throw new Error(`No Three.js module found for ${is}. Did you forget to extend the catalogue?`)
    }

    setIs<typeof module>(module)

    return TComp
  }
}) as unknown as typeof TComp & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [Key in keyof typeof THREE]: Component<Props<(typeof THREE)[Key]>, {}, 'ref'>
} & Record<string, Component>
