<script lang="ts">
  import DisposableObject from '../../internal/DisposableObject.svelte'
  import SceneGraphObject from '../../internal/SceneGraphObject.svelte'
  import { createParentContext, useParent } from '../../hooks/useParent'
  import { determineRef, isDisposableObject, extendsObject3D } from './utils/utils'
  import { useAttach } from './utils/useAttach'
  import { useCamera } from './utils/useCamera'
  import { useCreateEvent } from './utils/useCreateEvent'
  import { useEvents } from './utils/useEvents'
  import { usePlugins } from './utils/usePlugins'
  import { useProps } from './utils/useProps'
  import type { Props, Events, Slots } from './types'

  type Type = $$Generic

  type AllProps = {
    is: Type
  } & Props<Type>
  type $$Props = AllProps
  type $$Slots = Slots<Type>

  let {
    ref,
    is,
    args,
    attach,
    manual,
    makeDefault,
    dispose,
    children,
    ...restProps
  }: AllProps = $props()

  const parent = useParent()

  // Create Event
  const createEvent = useCreateEvent(restProps.$$events)

  ref = determineRef<Type>(is, args)

  // The ref is created, emit the event
  createEvent.updateRef(ref)

  let localRef = $state(ref)

  // In order to prevent updates by outside mutations on ref,
  // we need to create a local ref.
  $effect(() => {
    if (ref === localRef) {
      return
    }

    localRef = ref
  })

  let initialized = false

  // When "is" or "args" change, we need to create a new ref.
  $effect(() => {
    // Because reactive statements run immediately, we need to ignore the first run.
    if (!initialized) {
      initialized = true
      return
    }

    ref = determineRef<Type>(is, args)

    // The ref is created, emit the event
    createEvent.updateRef(ref)
  })

  const parentContext = createParentContext(ref)
  $effect(() => parentContext.set(ref))

  // Plugins are initialized here so that pluginsProps
  // is available in the props update
  const plugins = usePlugins({
    ref,
    props: {
      is,
      args,
      attach,
      manual,
      makeDefault,
      dispose,
      ...restProps
    }
  })
  const pluginsProps = plugins?.pluginsProps ?? []

  // Props
  const { updateProps } = useProps()
  $effect(() => updateProps(localRef, restProps, {
    manualCamera: manual,
    pluginsProps
  }))

  // Camera
  const camera = useCamera()
  $effect(() => camera.update(localRef, manual))
  $effect(() => camera.makeDefaultCamera(localRef, makeDefault))

  // Attachment
  const attachment = useAttach()
  $effect(() => attachment.update(localRef, $parent, attach))

  // Events
  const events = useEvents(restProps.$$events)
  $effect(() => events.updateRef(localRef))

  // update plugins after all other updates
  $effect(() => plugins?.updateRef(localRef))
  $effect(() => plugins?.updateProps({
    is,
    args,
    attach,
    manual,
    makeDefault,
    dispose,
    ...restProps
  }))
  $effect(() => plugins?.updateRestProps(restProps))
</script>

{#if isDisposableObject(ref)}
  <DisposableObject
    object={ref}
    {dispose}
  />
{/if}

{#if extendsObject3D(localRef)}
  <SceneGraphObject object={localRef}>
    {#if children}
      {@render children(localRef)}
    {/if}
  </SceneGraphObject>
{:else if children}
  {@render children(localRef)}
{/if}
