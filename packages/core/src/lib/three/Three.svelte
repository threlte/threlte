<script lang="ts">
  import { getContext, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'
  import type { Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import DisposableObject from '../internal/DisposableObject.svelte'
  import SceneGraphObject from '../internal/SceneGraphObject.svelte'
  import type { DisposableThreeObject } from '../types/components'
  import { useAttach } from './lib/useAttach'
  import { useCamera } from './lib/useCamera'
  import { useEvents } from './lib/useEvents'
  import { useProps } from './lib/useProps'
  import type { MaybeInstance, Props } from './types'

  type AnyClass = new (...args: any) => any

  // Basic Prop Types
  type Type = $$Generic

  type AllProps = {
    type: Type
  } & Props<Type>
  type $$Props = AllProps

  export let type: Type
  export let args: AllProps['args'] = undefined as AllProps['args']
  export let attach: AllProps['attach'] = undefined as AllProps['attach']
  export let manual: AllProps['manual'] = undefined as unknown as AllProps['manual']
  export let makeDefault: AllProps['makeDefault'] = undefined as unknown as AllProps['makeDefault']
  export let dispose: AllProps['dispose'] = undefined as unknown as AllProps['dispose']

  type ThrelteThreeParentContext = Writable<any | undefined>
  const parent = getContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context')

  // Type Gaurds
  const isClass = (type: any): type is AnyClass => {
    return typeof type === 'function' && /^\s*class\s+/.test(type.toString())
  }
  const argsIsConstructorParameters = (args: any): args is ConstructorParameters<AnyClass> => {
    return Array.isArray(args)
  }

  // We can't create the object in a reactive statement due to providing context
  export let ref = (
    isClass(type) && argsIsConstructorParameters(args)
      ? new type(...(args as any)) // TODO: fix this any
      : isClass(type)
      ? new type()
      : type
  ) as MaybeInstance<Type>
  let initialized = false
  $: if (initialized) {
    ref = (
      isClass(type) && argsIsConstructorParameters(args)
        ? new type(...(args as any)) // TODO: fix this any
        : isClass(type)
        ? new type()
        : type
    ) as MaybeInstance<Type>
  } else {
    initialized = true
  }
  const objectStore = writable(ref)
  $: objectStore.set(ref)
  setContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context', objectStore)

  // Props
  $: props = useProps()
  $: props.updateProps(ref, $$restProps, {
    manualCamera: manual
  })

  // Camera
  const { size } = useThrelte()
  $: camera = useCamera()
  $: camera.update(ref, $size, manual)
  $: camera.makeDefaultCamera(ref, makeDefault)

  // Attachment
  $: attachment = useAttach(ref, attach)
  $: attachment.update(ref, $parent, attach)

  const extendsObject3D = (object: any): object is Object3D => {
    return !!(object as any).isObject3D
  }

  const isDisposableObject = (object: any): object is DisposableThreeObject => {
    return (object as any).dispose !== undefined
  }

  const { updateRef } = useEvents()
  $: updateRef(ref)
</script>

{#if isDisposableObject(ref)}
  <DisposableObject
    object={ref}
    {dispose}
  />
{/if}

{#if extendsObject3D(ref)}
  <SceneGraphObject object={ref}>
    <slot {ref} />
  </SceneGraphObject>
{:else}
  <slot {ref} />
{/if}
