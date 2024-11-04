<script
  lang="ts"
  generics="Type"
>
  import type { TProps } from './types'
  import { useAttach } from './utils/useAttach'
  import { useCamera } from './utils/useCamera'
  import { useCreateEvent } from './utils/useCreateEvent'
  import { useDispose } from './utils/useDispose'
  import { useEvents } from './utils/useEvents'
  import { useIs } from './utils/useIs'
  import { usePlugins } from './utils/usePlugins'
  import { useProps } from './utils/useProps'
  import { determineRef } from './utils/utils'

  let {
    is = useIs<Type>(),
    args,
    attach,
    manual,
    makeDefault,
    dispose,
    ref = $bindable(),
    oncreate,
    children,
    ...props
  }: TProps<Type> = $props()

  // We can't create the object in a reactive statement due to providing context
  let internalRef = $derived(determineRef<Type>(is, args))

  // Create Event
  const createEvent = useCreateEvent<Type>(oncreate)

  // When "is" or "args" change, we need to create a new ref.
  $effect.pre(() => {
    if (ref === internalRef) return
    ref = internalRef
    // The ref is recreated, emit the event
    createEvent.updateRef(internalRef)
  })

  // Plugins are initialized here so that pluginsProps
  // is available in the props update
  const plugins = usePlugins(() => ({
    get ref() {
      return internalRef
    },
    get args() {
      return args
    },
    get attach() {
      return attach
    },
    get manual() {
      return manual
    },
    get makeDefault() {
      return makeDefault
    },
    get dispose() {
      return dispose
    },
    get props() {
      return props
    }
  }))

  // Props
  const { updateProp } = useProps()
  Object.keys(props).forEach((key) => {
    $effect.pre(() => {
      updateProp(internalRef, key, props[key], {
        manualCamera: manual,
        pluginsProps: plugins?.pluginsProps
      })
    })
  })

  // Attachment
  const attachment = useAttach<Type>()
  $effect.pre(() => attachment.updateAttach(attach))
  $effect.pre(() => attachment.updateRef(internalRef))

  // Camera management
  const camera = useCamera()
  $effect.pre(() => camera.updateRef(internalRef))
  $effect.pre(() => camera.updateManual(manual))
  $effect.pre(() => camera.updateMakeDefault(makeDefault))

  // Disposal
  const disposal = useDispose(dispose)
  $effect.pre(() => disposal.updateRef(internalRef))
  $effect.pre(() => disposal.updateDispose(dispose))

  // Events
  const events = useEvents(props)
  $effect.pre(() => events.updateRef(internalRef))
</script>

{@render children?.({ ref: internalRef })}
