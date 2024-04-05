<script lang="ts">
  import { useIsContext } from './utils/useIsContext'

  import DisposableObject from '../../internal/DisposableObject.svelte'
  import SceneGraphObject from '../../internal/SceneGraphObject.svelte'
  import { createParentContext, useParent } from '../../hooks/useParent'
  import { determineRef, isDisposableObject, extendsObject3D } from './utils/utils'
  import { createComponentEventsContext } from './utils/useComponentEvents'
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
  type $$Events = Events<Type>
  type $$Slots = Slots<Type>

  let {
    is = useIsContext(),
    args,
    attach,
    manual,
    makeDefault,
    dispose,
    children,
    ref = $bindable(),
    ...props
  }: AllProps = $props()
  
  createComponentEventsContext(props.$$events)

  // We can't create the object in a reactive statement due to providing context
  let internalRef = $state(determineRef<Type>(is, args))
  ref = internalRef

  const parent = useParent()

  // Create Event
  const createEvent = useCreateEvent<Type>()

  // The ref is created, emit the event
  createEvent.updateRef(internalRef)

  let initialized = false

  // When "is" or "args" change, we need to create a new ref.
  $effect.pre(() => {
    // Because reactive statements run immediately, we need to ignore the first run.
    if (!initialized) {
      initialized = true
      return
    }
  
    internalRef = determineRef<Type>(is, args)
    ref = internalRef
  
    // The ref is recreated, emit the event
    createEvent.updateRef(internalRef)
  })

  const parentContext = createParentContext(internalRef)
  $effect.pre(() => parentContext.set(internalRef))

  // Plugins are initialized here so that pluginsProps
  // is available in the props update
  const plugins = usePlugins({
    ref: internalRef,
    props: {
      is,
      args,
      attach,
      manual,
      makeDefault,
      dispose,
      ...props
    }
  })
  const pluginsProps = plugins?.pluginsProps ?? []

  // Props
  const { updateProps } = useProps()
  $effect.pre(() => updateProps(internalRef, props, {
    manualCamera: manual,
    pluginsProps
  }))

  // Camera
  const camera = useCamera()
  $effect.pre(() => {
    camera.update(internalRef, manual)
    camera.makeDefaultCamera(internalRef, makeDefault)
  })

  // Attachment
  const attachment = useAttach()
  $effect.pre(() => attachment.update(internalRef, $parent, attach))

  // Events
  const events = useEvents()
  $effect.pre(() => events.updateRef(internalRef))

  // update plugins after all other updates
  $effect.pre(() => plugins?.updateRef(internalRef))
  $effect.pre(() => plugins?.updateProps({
    is,
    args,
    attach,
    manual,
    makeDefault,
    dispose,
    ...props
  }))
  $effect.pre(() => plugins?.updateRestProps(props))
</script>

{#if isDisposableObject(internalRef)}
  <DisposableObject
    object={internalRef}
    {dispose}
  />
{/if}

{#if extendsObject3D(internalRef)}
  <SceneGraphObject object={internalRef}>
    {#if children}
      {@render children(internalRef)}
    {/if}
  </SceneGraphObject>
{:else if children}
  {@render children(internalRef)}
{/if}
