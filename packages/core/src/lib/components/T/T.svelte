<script
  lang="ts"
  generics="Type"
>
  import type { TProps } from './types.js'
  import { useAttach } from './utils/useAttach.svelte.js'
  import { useCamera } from './utils/useCamera.svelte.js'
  import { isDisposableObject, useDispose, useSetDispose } from './utils/useDispose.svelte.js'
  import { useEvents } from './utils/useEvents.svelte.js'
  import { useIs } from './utils/useIs.js'
  import { usePlugins } from './utils/usePlugins.js'
  import { useProps } from './utils/useProps.js'
  import { determineRef } from './utils/utils.js'
  import { isInstanceOf } from '../../utilities/index.js'
  import { untrack } from 'svelte'

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

  /**
   * When "is" or "args" change, we need to create a new ref.
   */
  const internalRef = $derived(determineRef<Type>(is, args))
  $effect.pre(() => {
    if (ref === internalRef) return
    ref = internalRef
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
  const propKeys = Object.keys(props)
  const { updateProp } = useProps()
  propKeys.forEach((key) => {
    const prop = $derived(props[key])
    $effect.pre(() => {
      updateProp(internalRef, key, prop, plugins?.pluginsProps, manual)
    })
  })

  // Attachment
  useAttach<Type>(
    () => internalRef,
    () => attach
  )

  // Camera management
  $effect.pre(() => {
    if (
      isInstanceOf(internalRef, 'PerspectiveCamera') ||
      isInstanceOf(internalRef, 'OrthographicCamera')
    ) {
      useCamera(
        () => internalRef,
        () => manual,
        () => makeDefault
      )
    }
  })

  // Disposal
  useSetDispose(() => dispose)

  $effect.pre(() => {
    if (isDisposableObject(internalRef)) {
      useDispose(() => internalRef)
    }
  })

  // Events
  useEvents(() => internalRef, propKeys, props)

  /**
   * oncreate needs to be called after all other hooks
   * so that props will have been set once ref is passed
   * to this callback
   */
  $effect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    internalRef
    let cleanup: void | (() => void) = undefined
    untrack(() => {
      cleanup = oncreate?.(internalRef)
    })
    return cleanup
  })
</script>

{@render children?.({ ref: internalRef })}
