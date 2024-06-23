<!--
@component `<Controller />` represents a THREE.XRTargetRaySpace, a THREE.XRGripSpace, and a controller model.
-->
<script
  lang="ts"
  context="module"
>
  import { writable } from 'svelte/store'
  import { T } from '@threlte/core'
  import { left as leftStore, right as rightStore } from '../hooks/useController'
  import { isHandTracking, pointerState, teleportState, controllerEvents } from '../internal/stores'
  import type { XRControllerEvent } from '../types'
  import PointerCursor from './internal/PointerCursor.svelte'
  import ShortRay from './internal/ShortRay.svelte'
  import ScenePortal from './internal/ScenePortal.svelte'
  import TeleportCursor from './internal/TeleportCursor.svelte'
  import TeleportRay from './internal/TeleportRay.svelte'

  const stores = {
    left: leftStore,
    right: rightStore
  } as const
</script>

<script lang="ts">
  type Props = {
    connected: XRControllerEvent<'connected'>
    disconnected: XRControllerEvent<'disconnected'>
    select: XRControllerEvent<'select'>
    selectstart: XRControllerEvent<'selectstart'>
    selectend: XRControllerEvent<'selectend'>
    squeeze: XRControllerEvent<'squeeze'>
    squeezeend: XRControllerEvent<'squeezeend'>
    squeezestart: XRControllerEvent<'squeezestart'>
  } & (
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

  let { left, right, hand, ...props }: Props = $props()

  const handedness = writable<'left' | 'right'>(left ? 'left' : right ? 'right' : hand)
  $effect.pre(() => handedness.set(left ? 'left' : right ? 'right' : (hand as 'left' | 'right')))

  controllerEvents[$handedness].set(props)
  $effect.pre(() => controllerEvents[$handedness].set(props))

  let store = $derived(stores[$handedness])
  let grip = $derived($store?.grip)
  let targetRay = $derived($store?.targetRay)
  let model = $derived($store?.model)
  let hasPointerControls = $derived($pointerState[$handedness].enabled)
  let hasTeleportControls = $derived($teleportState[$handedness].enabled)
</script>

{#if !$isHandTracking}
  {#if grip}
    <T is={grip}>
      <slot>
        <T is={model} />
      </slot>

      <slot name="grip" />
    </T>
  {/if}

  {#if targetRay}
    <T is={targetRay}>
      <slot name="target-ray" />

      {#if hasPointerControls || hasTeleportControls}
        {#if $$slots['pointer-ray']}
          <ShortRay handedness={$handedness}>
            <slot name="pointer-ray" />
          </ShortRay>
        {:else}
          <ShortRay handedness={$handedness} />
        {/if}
      {/if}
    </T>
  {/if}
{/if}

<ScenePortal>
  {#if hasPointerControls}
    {#if $$slots['pointer-cursor']}
      <PointerCursor handedness={$handedness}>
        <slot name="pointer-cursor" />
      </PointerCursor>
    {:else}
      <PointerCursor handedness={$handedness} />
    {/if}
  {/if}

  {#if hasTeleportControls && targetRay !== undefined}
    {#if $$slots['teleport-ray']}
      <TeleportRay
        {targetRay}
        handedness={$handedness}
      >
        <slot name="teleport-ray" />
      </TeleportRay>
    {:else}
      <TeleportRay
        {targetRay}
        handedness={$handedness}
      />
    {/if}

    {#if $$slots['teleport-ray']}
      <TeleportCursor handedness={$handedness}>
        <slot name="teleport-cursor" />
      </TeleportCursor>
    {:else}
      <TeleportCursor handedness={$handedness} />
    {/if}
  {/if}
</ScenePortal>
