<script lang="ts">
  import { useExtensions } from './extend'
  import { getContext, onDestroy, setContext } from 'svelte'
  import type { Writable } from 'svelte/store'
  import { Object3D } from 'three'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import { createObjectStore } from '../lib/createObjectStore'
  import SceneGraphObject from '../internal/SceneGraphObject.svelte'

  type ThrelteThreeParentContext = Writable<any | undefined>

  const parentStore = getContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context')
  export let parent: Object3D | undefined = $parentStore
  $: parent = $parentStore

  const cl = useExtensions()

  type T = $$Generic<keyof typeof cl>

  export let js: T

  type Class = new (...args: any) => any
  type ThreeClass = typeof cl[typeof js] extends new (...args: any) => any
    ? typeof cl[typeof js]
    : never
  type Object = typeof cl[typeof js] extends new (...args: any) => any
    ? InstanceType<typeof cl[typeof js]>
    : typeof cl[typeof js]
  type Args = ThreeClass extends Class ? ConstructorParameters<ThreeClass> : never

  export let args: Args | any[] | undefined = undefined
  export let attach: string | ((parent: any, self: any) => (() => void) | void) | undefined =
    undefined

  if (typeof cl[js] !== 'function') {
    throw new Error(`cl[${js}] is not a constructor`)
  }
  export const object = (
    args ? new (cl[js] as Class)(...(args as any)) : new (cl[js] as new () => any)()
  ) as Object

  const objectStore = createObjectStore(object as any)
  $: $objectStore = object

  setContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context', objectStore)

  const isMaterial = js.endsWith('Material')
  $: if (isMaterial) {
    // @ts-ignore
    parent.material = object
  }

  const isGeometry = js.endsWith('Geometry')
  $: if (isGeometry) {
    // @ts-ignore
    parent.geometry = object
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

  const isObject3D = (object: any): object is Object3D => {
    return (object as any) instanceof Object3D
  }
</script>

{#if isObject3D(object)}
  <SceneGraphObject {object}>
    <slot {object} />
  </SceneGraphObject>
{:else}
  <slot {object} />
{/if}
