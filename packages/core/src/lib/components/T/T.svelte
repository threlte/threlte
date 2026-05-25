<script
  lang="ts"
  generics="Type"
>
  import type { TProps } from './types.js'
  import { useAttach } from './utils/useAttach.svelte.js'
  import { useDispose } from './utils/useDispose.svelte.js'
  import { useIs } from './utils/useIs.js'
  import { usePlugins } from './utils/usePlugins.js'
  import { useProps } from './utils/useProps.svelte.js'
  import { determineRef } from './utils/utils.js'
  import { isInstanceOf } from '../../utilities/isInstanceOf.js'
  import { untrack } from 'svelte'
  import { createParentObject3DContext } from '../../context/fragments/parentObject3D.js'
  import { createParentContext } from '../../context/fragments/parent.js'
  import Camera from './Camera.svelte'

  let {
    is = useIs<Type>(),
    args,
    attach,
    dispose,
    ref = $bindable(),
    oncreate,
    children,
    makeDefault,
    manual,
    ...props
  }: TProps<Type> = $props()

  /**
   * When "is" or "args" change, we need to create a new ref.
   */
  const internalRef = $derived(determineRef<Type>(is, args))

  // Plugins are initialized here so that pluginsProps
  // is available in the props update
  const plugins = usePlugins({
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
  })

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

  // Disposal
  useDispose(
    () => internalRef,
    () => dispose
  )

  createParentObject3DContext(() =>
    isInstanceOf(internalRef, 'Object3D') ? internalRef : undefined
  )
  createParentContext(() => internalRef)

  /**
   * oncreate needs to be called after all other hooks
   * so that props will have been set once ref is passed
   * to this callback
   */
  $effect(() => {
    if (internalRef) {
      return untrack(() => {
        if (ref !== internalRef) {
          ref = internalRef
        }

        return oncreate?.(internalRef)
      })
    }
  })
</script>

<!-- Avoids paying the performance tax of useCamera if the component is not a camera -->
{#if isInstanceOf(internalRef, 'PerspectiveCamera') || isInstanceOf(internalRef, 'OrthographicCamera')}
  <Camera
    ref={internalRef}
    {manual}
    {makeDefault}
    {...props}
  />
{/if}

{@render children?.({ ref: internalRef })}
