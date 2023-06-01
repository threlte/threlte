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
  export let ref = (
    isClass(is) && argsIsConstructorParameters(args)
      ? new is(...(args as any)) // TODO: fix this any
      : isClass(is)
      ? new is()
      : is
  ) as MaybeInstance<Type>
  let initialized = false
  // the ref has been created, emit the create event …
  createEvent.updateRef(ref)
  // … and create the object store. This store is used to
  // run updates based on actual ref changes. So this store
  // should be used in reactive statements
  const refStore = writable(ref)

  const maybeSetRef = () => {
    // because reactive statements run immediately, we need to ignore the first run
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
    // the ref has been recreated, emit the create event …
    createEvent.updateRef(ref)
    // … and set the object store.
    refStore.set(ref)
  }
  $: is, args, maybeSetRef()

  setContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context', refStore)

  // Plugins are initialized here so that pluginsProps
  // is available in the props update
  const plugins = usePlugins({ ref, props: $$props })
  const pluginsProps = plugins?.pluginsProps ?? []

  // Props
  const props = useProps()
  $: props.updateProps($refStore, $$restProps, {
    manualCamera: manual,
    pluginsProps
  })

  // Camera
  const camera = useCamera()
  $: camera.update($refStore, manual)
  $: camera.makeDefaultCamera($refStore, makeDefault)

  // Attachment
  const attachment = useAttach()
  $: attachment.update($refStore, $parent, attach)

  // Events
  const events = useEvents()
  $: events.updateRef($refStore)

  // update plugins after all other updates
  $: plugins?.updateRef($refStore)
  $: plugins?.updateProps($$props)
  $: plugins?.updateRestProps($$restProps)

  const extendsObject3D = (object: any): object is Object3D => {
    return !!(object as any).isObject3D
  }

  const isDisposableObject = (object: any): object is DisposableThreeObject => {
    return (object as any).dispose !== undefined
  }
</script>

{#if isDisposableObject($refStore)}
  <DisposableObject object={$refStore} {dispose} />
{/if}

{#if extendsObject3D($refStore)}
  <SceneGraphObject object={$refStore}>
    <slot {ref} />
  </SceneGraphObject>
{:else}
  <slot {ref} />
{/if}
