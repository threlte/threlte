import type { ComponentConstructorOptions, ComponentProps, SvelteComponent } from 'svelte'
import * as THREE from 'three'
import TComp from './T.svelte'
import type { Events, Props, Slots } from './types'

type Extensions = Record<string, any>

const catalogue: Extensions = {}

/**
 * Extends the default THREE namespace and allows using custom Three.js objects with `<T>`.
 *
 * @example
 * ```svelte
 * <script>
 * 	import { extend, T } from 'threlte'
 * 	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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

const augmentConstructorArgs = (
  args: ComponentConstructorOptions<ComponentProps<TComp<any>>>,
  is: keyof typeof THREE
) => {
  const module = catalogue[is] || THREE[is]
  if (!module) {
    throw new Error(`No Three.js module found for ${is}. Did you forget to extend the catalogue?`)
  }
  return {
    ...args,
    props: {
      ...args.props,
      is: module
    }
  }
}

const proxyTConstructor = (is: keyof typeof THREE) => {
  return new Proxy(class {}, {
    construct(_, [args]) {
      const castedArgs = args as ComponentConstructorOptions<ComponentProps<TComp<any>>>
      return new TComp(augmentConstructorArgs(castedArgs, is))
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
export const T = new Proxy(class {}, {
  construct(_, [args]) {
    const castedArgs = args as ComponentConstructorOptions<ComponentProps<TComp<any>>>
    return new TComp(castedArgs)
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
