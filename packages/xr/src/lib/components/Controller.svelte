<!--
@component `<Controller />` represents a THREE.XRTargetRaySpace, a THREE.XRGripSpace, and a controller model.
-->
<script
  lang="ts"
  context="module"
>
  import { T, createRawEventDispatcher } from '@threlte/core'
  import { gaze, left as leftStore, right as rightStore } from '../hooks/useController'
  import { isHandTracking, pointerState, teleportState } from '../internal/stores'
  import type { XRControllerEvent } from '../types'
  import PointerCursor from './internal/PointerCursor.svelte'
  import ShortRay from './internal/ShortRay.svelte'
  import ScenePortal from './internal/ScenePortal.svelte'
  import TeleportCursor from './internal/TeleportCursor.svelte'
  import TeleportRay from './internal/TeleportRay.svelte'

  const stores = {
    left: leftStore,
    right: rightStore,
    none: gaze
  } as const
</script>

<script lang="ts">
  type $$Props =
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

  export let left: $$Props['left'] = undefined
  export let right: $$Props['right'] = undefined
  export let hand: $$Props['hand'] = undefined

  type $$Events = {
    connected: XRControllerEvent<'connected'>
    disconnected: XRControllerEvent<'disconnected'>
    select: XRControllerEvent<'select'>
    selectstart: XRControllerEvent<'selectstart'>
    selectend: XRControllerEvent<'selectend'>
    squeeze: XRControllerEvent<'squeeze'>
    squeezeend: XRControllerEvent<'squeezeend'>
    squeezestart: XRControllerEvent<'squeezestart'>
  }

  $: handedness = (left ? 'left' : right ? 'right' : hand) as 'left' | 'right'

  const dispatch = createRawEventDispatcher<$$Events>()

  $: store = stores[handedness]
  $: grip = $store?.grip
  $: targetRay = $store?.targetRay
  $: model = $store?.model
  $: hasPointerControls = $pointerState[handedness].enabled
  $: hasTeleportControls = $teleportState[handedness].enabled
</script>

{#if !$isHandTracking}
  {#if grip}
    <T
      is={grip}
      name="XR controller grip {handedness}"
    >
      <slot>
        <T is={model} />
      </slot>

      <slot name="grip" />
    </T>
  {/if}

  {#if targetRay}
    <T
      is={targetRay}
      name="XR controller {handedness}"
    >
      <slot name="target-ray" />

      {#if hasPointerControls || hasTeleportControls}
        {#if $$slots['pointer-ray']}
          <ShortRay {handedness}>
            <slot name="pointer-ray" />
          </ShortRay>
        {:else}
          <ShortRay {handedness} />
        {/if}
      {/if}
    </T>
  {/if}
{/if}

<ScenePortal>
  {#if hasPointerControls}
    {#if $$slots['pointer-cursor']}
      <PointerCursor {handedness}>
        <slot name="pointer-cursor" />
      </PointerCursor>
    {:else}
      <PointerCursor {handedness} />
    {/if}
  {/if}

  {#if hasTeleportControls && targetRay !== undefined}
    {#if $$slots['teleport-ray']}
      <TeleportRay
        {targetRay}
        {handedness}
      >
        <slot name="teleport-ray" />
      </TeleportRay>
    {:else}
      <TeleportRay
        {targetRay}
        {handedness}
      />
    {/if}

    {#if $$slots['teleport-ray']}
      <TeleportCursor {handedness}>
        <slot name="teleport-cursor" />
      </TeleportCursor>
    {:else}
      <TeleportCursor {handedness} />
    {/if}
  {/if}
</ScenePortal>
