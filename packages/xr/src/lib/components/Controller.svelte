<!--
@component `<Controller />` represents a THREE.XRTargetRaySpace, a THREE.XRGripSpace, and a controller model.
-->
<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { useController } from '../hooks/useController.svelte.js'
  import { pointerState, teleportState } from '../internal/state.svelte.js'
  import { addSubscriber } from '../internal/inputSources.svelte.js'
  import { xrOrigin } from '../hooks/useXROrigin.svelte.js'
  import type { XRControllerEvents } from '../types.js'
  import PointerCursor from './internal/PointerCursor.svelte'
  import ShortRay from './internal/ShortRay.svelte'
  import TeleportCursor from './internal/TeleportCursor.svelte'
  import TeleportRay from './internal/TeleportRay.svelte'
  import type { Snippet } from 'svelte'

  type Props = {
    children?: Snippet
    grip?: Snippet
    targetRay?: Snippet
    pointerRay?: Snippet
    pointerCursor?: Snippet
    teleportRay?: Snippet
    teleportCursor?: Snippet
  } & XRControllerEvents &
    (
      | {
          /** Whether the controller should be matched with the left hand. */
          left: true
          right?: undefined
          hand?: undefined
        }
      | {
          /** Whether the controller should be matched with the right hand. */
          right: true
          left?: undefined
          hand?: undefined
        }
      | {
          /** Whether the controller should be matched with the left or right hand. */
          hand: 'left' | 'right'
          left?: undefined
          right?: undefined
        }
    )

  let {
    left,
    right,
    hand,

    onconnected,
    ondisconnected,
    onselect,
    onselectend,
    onselectstart,
    onsqueeze,
    onsqueezeend,
    onsqueezestart,

    children,
    grip: gripSnippet,
    targetRay: targetRaySnippet,
    pointerRay: pointerRaySnippet,
    pointerCursor: pointerCursorSnippet,
    teleportRay: teleportRaySnippet,
    teleportCursor: teleportCursorSnippet
  }: Props = $props()

  const { scene } = useThrelte()
  const attachTarget = $derived(xrOrigin.current ?? scene)
  const handedness: 'left' | 'right' = left ? 'left' : right ? 'right' : (hand ?? 'left')
  const controller = useController(handedness)

  $effect.pre(() => {
    return addSubscriber({
      type: 'controller',
      handedness,
      callbacks: {
        onconnected,
        ondisconnected,
        onselect,
        onselectend,
        onselectstart,
        onsqueeze,
        onsqueezeend,
        onsqueezestart
      }
    })
  })

  const grip = $derived($controller?.grip)
  const targetRay = $derived($controller?.targetRay)
  const model = $derived($controller?.model)
  const hasPointerControls = $derived.by(() =>
    handedness === 'left' ? pointerState.left.enabled : pointerState.right.enabled
  )
  const hasTeleportControls = $derived.by(() =>
    handedness === 'left' ? teleportState.left.enabled : teleportState.right.enabled
  )
</script>

{#if grip}
  <T
    is={grip}
    attach={attachTarget}
  >
    {#if children}
      {@render children?.()}
    {:else}
      <T is={model} />
    {/if}

    {@render gripSnippet?.()}
  </T>
{/if}

{#if targetRay}
  <T
    is={targetRay}
    attach={attachTarget}
  >
    {@render targetRaySnippet?.()}

    {#if hasPointerControls || hasTeleportControls}
      <ShortRay
        {handedness}
        children={pointerRaySnippet}
      />
    {/if}
  </T>
{/if}

{#if hasPointerControls}
  <PointerCursor
    {handedness}
    children={pointerCursorSnippet}
  />
{/if}

{#if hasTeleportControls && targetRay !== undefined}
  <TeleportRay
    {targetRay}
    {handedness}
    children={teleportRaySnippet}
  />

  <TeleportCursor
    {handedness}
    children={teleportCursorSnippet}
  />
{/if}
