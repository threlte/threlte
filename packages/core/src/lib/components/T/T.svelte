<script lang="ts">
  import { useIsContext } from './utils/useIsContext'
  import DisposableObject from '../../internal/DisposableObject.svelte'
  import SceneGraphObject from '../../internal/SceneGraphObject.svelte'
  import { createParentContext, useParent } from '../../hooks/useParent'
  import { determineRef, isDisposableObject, extendsObject3D } from './utils/utils'
  import { useAttach } from './utils/useAttach'
  import { isCamera } from './utils/useCamera'
  import { useCreateEvent } from './utils/useCreateEvent'
  import { useEvents } from './utils/useEvents'
  import { usePlugins } from './utils/usePlugins'
  import { useProps } from './utils/useProps'
  import type { Props } from './types'
  import Camera from './Camera.svelte'

  type Type = $$Generic

  type AllProps = {
    is: Type
  } & Props<Type>

  let {
    is = useIsContext<Type>(),
    args,
    attach,
    manual,
    makeDefault,
    dispose,
    ref = $bindable(),
    oncreate,
    children,
    ...props
  }: AllProps = $props()

  // We can't create the object in a reactive statement due to providing context
  let internalRef = $derived(determineRef<Type>(is, args))
  ref = internalRef

  const parent = useParent()

  // Create Event
  const createEvent = useCreateEvent<Type>(oncreate)

  // The ref is created, emit the event
  createEvent.updateRef(internalRef)

  // When "is" or "args" change, we need to create a new ref.
  $effect.pre(() => {
    if (ref === internalRef) return

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
  const { updateProp } = useProps()
  Object.keys(props).forEach((key) => {
    $effect.pre(() => {
      updateProp(internalRef, key, props[key], {
        manualCamera: manual,
        pluginsProps
      })
    })
  })

  // Attachment
  const attachment = useAttach()
  $effect.pre(() => attachment.update(internalRef, $parent, attach))

  // Events
  const events = useEvents(props)
  $effect.pre(() => events.updateRef(internalRef))

  // update plugins after all other updates
  $effect.pre(() => plugins?.updateRef(internalRef))
  $effect.pre(() =>
    plugins?.updateProps({
      is,
      args,
      attach,
      manual,
      makeDefault,
      dispose,
      ...props
    })
  )
  $effect.pre(() => plugins?.updateRestProps(props))
</script>

{#if isDisposableObject(internalRef)}
  <DisposableObject object={internalRef} {dispose} />
{/if}

{#if isCamera(internalRef)}
  <Camera object={internalRef} {manual} {makeDefault} />
{/if}

{#if extendsObject3D(internalRef)}
  <SceneGraphObject object={internalRef}>
    {#if children}
      {@render children({ ref: internalRef })}
    {/if}
  </SceneGraphObject>
{:else if children}
  {@render children({ ref: internalRef })}
{/if}
