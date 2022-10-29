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

  const parentStore = getContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context')
  let parent: Object3D | undefined = $parentStore
  $: parent = $parentStore

  const extended = useExtensions()

  type T = $$Generic<keyof typeof extended>

  export let js: T

  type Class = new (...args: any) => any
  type ThreeClass = typeof extended[typeof js] extends new (...args: any) => any
    ? typeof extended[typeof js]
    : never
  type Object = typeof extended[typeof js] extends new (...args: any) => any
    ? InstanceType<typeof extended[typeof js]>
    : typeof extended[typeof js]
  type Args = ThreeClass extends Class ? ConstructorParameters<ThreeClass> : never

  export let args: Args | any[] | undefined = undefined
  export let attach: string | ((parent: any, self: Object) => (() => void) | void) | undefined =
    undefined

  type $$Props = {
    js: T
    args?: Args | any[]
    attach?: string | ((parent: any, self: any) => (() => void) | void)
    object?: Object
  } & Record<
    string,
    any
  > & {
			/* prettier-ignore */
			// let's add types for object setters and properties
      [K in keyof Object]?:
			// if a property has a function "set" …
			Object[K] extends { set: (...args: any[]) => any }
				// … then we can use it as a type, setScalar is
				// included as it's always the first argument to
				// the properties set function
        ? Parameters<Object[K]['set']> | Parameters<Object[K]['set']>[0]
				// if the property does not have a "set" function,
				// and is a function …
        : Object[K] extends (...args: any[]) => any
				// we don't want it to be a property
        ? never
				// otherwise, it's a property with just a value
        : Object[K]
    }

  const makeBaseInstance = (args: any): Object => {
    return (args ? new (extended[js] as any)(...args) : new (extended[js] as any)()) as Object
  }

  if (typeof extended[js] !== 'function') {
    throw new Error(`extended[${js}] is not a constructor`)
  }
  const instance = prepareInstance(makeBaseInstance(args), js)
  export const object = instance as Object

  $: applyProps(instance, $$props)

  const objectStore = createObjectStore(instance as any)
  $: $objectStore = instance

  setContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context', objectStore)

  const { setCamera } = useThrelteRoot()
  const isCamera = js.endsWith('Camera')
  $: if (isCamera) {
    setCamera(instance as any)
  }

  useAttach(parent, instance, attach)

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
