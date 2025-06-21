<script
  lang="ts"
  generics="Type"
>
  import type { TProps } from './types'
  import { useAttach } from './utils/useAttach.svelte'
  import { useCamera } from './utils/useCamera.svelte'
  import { useDispose } from './utils/useDispose'
  import { useEvents } from './utils/useEvents.svelte'
  import { useIs } from './utils/useIs'
  import { usePlugins } from './utils/usePlugins'
  import { useProps } from './utils/useProps'
  import { determineRef } from './utils/utils'

  let {
    is = useIs<Type>(),
    args,
    attach,
    manual = false,
    makeDefault = false,
    dispose,
    ref = $bindable(),
    oncreate,
    children,
    ...props
  }: TProps<Type> = $props()

  // We can't create the object in a reactive statement due to providing context
  const internalRef = $derived(determineRef<Type>(is, args))

  // When "is" or "args" change, we need to create a new ref.
  $effect.pre(() => {
    if (ref === internalRef) return
    ref = internalRef
  })

  let calledOnce = false
  $effect(() => {
    if (calledOnce && ref === internalRef) return
    calledOnce = true
    return oncreate?.(internalRef)
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
  useAttach<Type>(
    () => internalRef,
    () => attach
  )

  // Camera management
  useCamera(
    () => internalRef,
    () => manual,
    () => makeDefault
  )

  // Disposal
  const disposal = useDispose(dispose)
  $effect.pre(() => disposal.updateRef(internalRef))
  $effect.pre(() => disposal.updateDispose(dispose))

  // Events
  useEvents(props, () => internalRef)
</script>

{@render children?.({ ref: internalRef })}
