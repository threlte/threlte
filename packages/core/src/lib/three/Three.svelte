<script lang="ts">
  import { getContext, setContext } from 'svelte'
  import type { Writable } from 'svelte/store'
  import { Object3D } from 'three'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import DisposableObject from '../internal/DisposableObject.svelte'
  import SceneGraphObject from '../internal/SceneGraphObject.svelte'
  import { createObjectStore } from '../lib/createObjectStore'
  import type { DisposableThreeObject } from '../types/components'
  import { useExtensions } from './extend'
  import { prepareInstance } from './utils/prepare'
  import { applyProps } from './utils/props'
  import { useAttach } from './utils/useAttach'

  type ThrelteThreeParentContext = Writable<any | undefined>

  const parent = getContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context')

  const extended = useExtensions()

  type T = $$Generic<keyof typeof extended>

  export let type: T

  type AnyClass = new (...args: any) => any
  type ThreeClass = typeof extended[typeof type] extends new (...args: any) => any
    ? typeof extended[typeof type]
    : never
  type ThreeClassInstance = ThreeClass extends never ? never : InstanceType<ThreeClass>
  type Args = ThreeClass extends AnyClass ? ConstructorParameters<ThreeClass> : never

  export let args: Args | any[] | undefined = undefined
  export let attach:
    | string
    | ((parent: any, self: ThreeClassInstance) => (() => void) | void)
    | undefined = undefined

  type $$Props = {
    js: T
    args?: Args | any[]
    attach?: string | ((parent: any, self: any) => (() => void) | void)
    object?: ThreeClassInstance
  } & Record<
    string,
    any
  > & {
			/* prettier-ignore */
			// let's add types for object setters and properties
      [K in keyof ThreeClassInstance]?:
			// if a property has a function "set" …
			ThreeClassInstance[K] extends { set: (...args: any[]) => any }
				// … then we can use it as a type, setScalar is
				// included as it's always the first argument to
				// the properties set function
        ? Parameters<ThreeClassInstance[K]['set']> | Parameters<ThreeClassInstance[K]['set']>[0]
				// if the property does not have a "set" function,
				// and is a function …
        : ThreeClassInstance[K] extends (...args: any[]) => any
				// we don't want it to be a property
        ? never
				// otherwise, it's a property with just a value
        : ThreeClassInstance[K]
    }

  const makeBaseInstance = (args: any): ThreeClassInstance => {
    return (
      args ? new (extended[type] as any)(...args) : new (extended[type] as any)()
    ) as ThreeClassInstance
  }

  if (typeof extended[type] !== 'function') {
    throw new Error(`extended[${type}] is not a constructor`)
  }
  const instance = prepareInstance(makeBaseInstance(args), type, $parent)
  $: instance._threlte_three.parent = $parent

  export const object = instance as ThreeClassInstance

  $: applyProps(instance, $$props)

  const objectStore = createObjectStore(instance as any)
  $: $objectStore = instance

  setContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context', objectStore)

  const { setCamera } = useThrelteRoot()
  const isCamera = type.endsWith('Camera')
  $: if (isCamera) {
    setCamera(instance as any)
  }

  useAttach(instance, attach)

  const extendsObject3D = (object: any): object is Object3D => {
    return (object as any) instanceof Object3D
  }

  const isDisposableObject = (object: any): object is DisposableThreeObject => {
    return (object as any).dispose !== undefined
  }
</script>

{#if isDisposableObject(object)}
  <DisposableObject {object} />
{/if}

{#if extendsObject3D(object)}
  <SceneGraphObject {object}>
    <slot {object} />
  </SceneGraphObject>
{:else}
  <slot {object} />
{/if}
