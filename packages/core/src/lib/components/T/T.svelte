<script lang="ts">
  import { getContext, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'
  import type { Object3D } from 'three'
  import DisposableObject from '../../internal/DisposableObject.svelte'
  import SceneGraphObject from '../../internal/SceneGraphObject.svelte'
  import type { DisposableThreeObject } from '../../types'
  import { useAttach } from './utils/useAttach'
  import { useCamera } from './utils/useCamera'
  import { useCreateEvent } from './utils/useCreateEvent'
  import { useEvents } from './utils/useEvents'
  import { usePlugins } from './utils/usePlugins'
  import { useProps } from './utils/useProps'
  import type { Props, Events, Slots, AnyClass, MaybeInstance } from './types'

  type Type = $$Generic

  type AllProps = {
    is: Type
  } & Props<Type>
  type $$Props = AllProps
  type $$Events = Events<Type>
  type $$Slots = Slots<Type>

  export let is: Type
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

  // Create Event
  const createEvent = useCreateEvent()

  // We can't create the object in a reactive statement due to providing context
  let ref = (
    isClass(is) && argsIsConstructorParameters(args)
      ? new is(...(args as any)) // TODO: fix this any
      : isClass(is)
        ? new is()
        : is
  ) as MaybeInstance<Type>
  // The ref is created, emit the event
  createEvent.updateRef(ref)

  let initialized = false
  // When "is" or "args" change, we need to create a new ref.
  const maybeSetRef = () => {
    // Because reactive statements run immediately, we need to ignore the first run.
    if (!initialized) {
      initialized = true
      return
    }
    ref = (
      isClass(is) && argsIsConstructorParameters(args)
        ? new is(...(args as any)) // TODO: fix this any
        : isClass(is)
          ? new is()
          : is
    ) as MaybeInstance<Type>
    // The ref is recreated, emit the event
    createEvent.updateRef(ref)
  }
  $: is, args, maybeSetRef()

  // In order to prevent updates by outside mutations on ref,
  // we need to create a publicly exposed ref.
  let publicRef = ref
  $: publicRef = ref
  export { publicRef as ref }

  const refStore = writable(ref)
  $: refStore.set(ref)
  setContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context', refStore)

  // Plugins are initialized here so that pluginsProps
  // is available in the props update
  const plugins = usePlugins({ ref: ref, props: $$props })
  const pluginsProps = plugins?.pluginsProps ?? []

  // Props
  const props = useProps()
  $: props.updateProps(ref, $$restProps, {
    manualCamera: manual,
    pluginsProps
  })

  // Camera
  const camera = useCamera()
  $: camera.update(ref, manual)
  $: camera.makeDefaultCamera(ref, makeDefault)

  // Attachment
  const attachment = useAttach()
  $: attachment.update(ref, $parent, attach)

  // Events
  const events = useEvents()
  $: events.updateRef(ref)

  // update plugins after all other updates
  $: plugins?.updateRef(ref)
  $: plugins?.updateProps($$props)
  $: plugins?.updateRestProps($$restProps)

  const extendsObject3D = (object: any): object is Object3D => {
    return !!(object as any).isObject3D
  }

  const isDisposableObject = (object: any): object is DisposableThreeObject => {
    return (object as any).dispose !== undefined
  }
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
