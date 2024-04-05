import type { SvelteComponent } from 'svelte'
import * as THREE from 'three'
import TComp from './T.svelte'
import type { Events, Props, Slots } from './types'
import { setIsContext } from './utils/useIsContext'

type Extensions = Record<string, any>

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

const proxyTConstructor = (is: keyof typeof THREE) => {
  return new Proxy(function () {}, {
    apply(_target, _thisArg, argArray) {
      const module = THREE[is] || catalogue[is]

      if (module === undefined) {
        throw new Error(
          `No Three.js module found for ${is}. Did you forget to extend the catalogue?`
        )
      }

      setIsContext(module)

      return TComp(document.body, argArray[1])
    }
  })
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
  apply(_target, _thisArg, argArray) {
    return TComp(document.body, argArray[1])
  },
  get(_, is: keyof typeof THREE) {
    return proxyTConstructor(is)
  }
}) as unknown as typeof TComp & {
  [Key in keyof typeof THREE]: typeof SvelteComponent<
    Props<(typeof THREE)[Key]>,
    Events<(typeof THREE)[Key]>,
    Slots<(typeof THREE)[Key]>
  >
} & Record<string, typeof SvelteComponent>
