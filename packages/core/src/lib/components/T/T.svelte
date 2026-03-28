<script
  lang="ts"
  generics="Type"
>
  import type { TProps } from './types.js'
  import { useAttach } from './utils/useAttach.svelte.js'
  import { isDisposableObject, useDispose, useSetDispose } from './utils/useDispose.svelte.js'
  import { useIs } from './utils/useIs.js'
  import { usePlugins } from './utils/usePlugins.js'
  import { useProps } from './utils/useProps.svelte.js'
  import { determineRef } from './utils/utils.js'
  import { isInstanceOf } from '../../utilities/isInstanceOf.js'
  import { untrack } from 'svelte'
  import { createParent } from './utils/useParent.svelte.js'
  import { createParentObject3D } from './utils/useParentObject3D.svelte.js'
  import Camera from './Camera.svelte'

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

  /**
   * When "is" or "args" change, we need to create a new ref.
   */
  const internalRef = $derived(determineRef<Type>(is, args))

  // Attachment
  useAttach<Type>(
    () => internalRef,
    () => attach
  )

  createParent(() => internalRef)
  createParentObject3D(() => (isInstanceOf(internalRef, 'Object3D') ? internalRef : undefined))

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

{#if isInstanceOf(internalRef, 'PerspectiveCamera') || isInstanceOf(internalRef, 'OrthographicCamera')}
  <Camera
    ref={internalRef}
    {manual}
    {makeDefault}
    {...props}
  />
{/if}

{@render children?.({ ref: internalRef })}
