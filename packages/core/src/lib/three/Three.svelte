<script lang="ts">
  import { useExtensions } from './extend'
  import { getContext, onDestroy, setContext } from 'svelte'
  import type { Writable } from 'svelte/store'
  import { Object3D } from 'three'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import { createObjectStore } from '../lib/createObjectStore'
  import SceneGraphObject from '../internal/SceneGraphObject.svelte'
  import DisposableObject from '../internal/DisposableObject.svelte'
  import type { DisposableThreeObject } from '../types/components'

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

  const makeObject = (args: any): Object => {
    return (args ? new (extended[js] as any)(...args) : new (extended[js] as any)()) as Object
  }

  if (typeof extended[js] !== 'function') {
    throw new Error(`extended[${js}] is not a constructor`)
  }
  export const object = makeObject(args)

  $: {
    Object.entries($$props).forEach(([key, value]) => {
      let k = key
      if (key === '$$scope') return
      if (key === '$$slots') return
      if (key === 'js') return
      if (key === 'args') return
      if (key === 'attach') return
      if (key === 'object') return

      let obj = object as any

      const path = key.split('.')
      if (path.length > 1) {
        for (let i = 0; i < path.length - 1; i++) {
          obj = obj[path[i]]
        }
        k = path[path.length - 1]
      }

      // edge case of setScalar setters
      if (
        !Array.isArray(value) &&
        typeof value === 'number' &&
        typeof obj[k]?.setScalar === 'function'
      ) {
        obj[k].setScalar(value)
        return
      }

      if (typeof obj[k]?.set === 'function') {
        // if the property has a "set" function, we can use it
        if (Array.isArray(value)) {
          obj[k].set(...value)
        } else {
          obj[k].set(value)
        }
      } else {
        // otherwise, we just set the value
        obj[k] = value
      }
    })
  }

  const objectStore = createObjectStore(object as any)
  $: $objectStore = object

  setContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context', objectStore)

  const isMaterial = js.endsWith('Material')
  $: if (isMaterial && !attach) {
    ;(parent as any).material = object
  }

  const isGeometry = js.endsWith('Geometry')
  $: if (isGeometry && !attach) {
    ;(parent as any).geometry = object
  }

  const { setCamera } = useThrelteRoot()
  const isCamera = js.endsWith('Camera')
  $: if (isCamera) {
    setCamera(object as any)
  }

  let attachRemoveFn: (() => void) | undefined = undefined
  $: if (attach && parent) {
    if (typeof attach === 'string') {
      const route = attach.split('.')
      if (route.length === 1) {
        // @ts-ignore
        parent[attach] = object
      } else {
        // @ts-ignore
        let obj = parent as any
        route.forEach((key, index, arr) => {
          if (index === arr.length - 1) {
            obj[key] = object
          } else {
            obj = obj[key]
          }
        })
      }
    } else {
      attachRemoveFn = attach(parent, object) ?? undefined
    }
  }
  onDestroy(() => {
    attachRemoveFn?.()
  })

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
