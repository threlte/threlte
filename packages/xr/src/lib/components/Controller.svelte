<!--
@component `<Controller />` represents a THREE.XRTargetRaySpace, a THREE.XRGripSpace, and a controller model.
-->
<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { controllers } from '../hooks/useController.svelte.js'
  import {
    isHandTracking,
    pointerState,
    teleportState,
    controllerEvents
  } from '../internal/state.svelte.js'
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

  const handedness = $derived<'left' | 'right'>(left ? 'left' : right ? 'right' : hand ?? 'left')

  $effect.pre(() => {
    controllerEvents[handedness] = {
      onconnected,
      ondisconnected,
      onselect,
      onselectend,
      onselectstart,
      onsqueeze,
      onsqueezeend,
      onsqueezestart
    }

    return () => {
      controllerEvents[handedness] = undefined
    }
  })

  const xrController = $derived(controllers[handedness])
  const grip = $derived(xrController?.grip)
  const targetRay = $derived(xrController?.targetRay)
  const model = $derived(xrController?.model)
  const hasPointerControls = $derived(pointerState[handedness].enabled)
  const hasTeleportControls = $derived(teleportState[handedness].enabled)
</script>

{#if !isHandTracking.current}
  {#if grip}
    <T
      is={grip}
      attach={scene}
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
    <T is={targetRay}>
      {@render targetRaySnippet?.()}

      {#if hasPointerControls || hasTeleportControls}
        <ShortRay
          {handedness}
          children={pointerRaySnippet}
        />
      {/if}
    </T>
  {/if}
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
