<script
  lang="ts"
  generics="Type"
>
  import type { TProps } from './types.js'
  import { useAttach } from './utils/useAttach.svelte.js'
  import { useCamera } from './utils/useCamera.svelte.js'
  import { isDisposableObject, useDispose, useSetDispose } from './utils/useDispose.svelte.js'
  import { useIs } from './utils/useIs.js'
  import { usePlugins } from './utils/usePlugins.js'
  import { useProps } from './utils/useProps.svelte.js'
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
  useProps(
    () => internalRef,
    () => props,
    () => plugins?.pluginsProps
  )

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
        () => makeDefault,
        () => props
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

  $effect.pre(() => {
    if (internalRef) {
      return untrack(() => {
        ref = internalRef
        return oncreate?.(internalRef)
      })
    }
  })
</script>

{@render children?.({ ref: internalRef })}
