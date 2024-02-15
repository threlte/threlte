<script
  lang="ts"
  context="module"
>
  import type { Group } from 'three'
  import { T, useThrelte, createRawEventDispatcher, useTask } from '@threlte/core'
  import type { XRHandEvent } from '../types'
  import { isHandTracking, handDispatchers } from '../internal/stores'
  import { left as leftStore, right as rightStore } from '../hooks/useHand'
  import ScenePortal from './internal/ScenePortal.svelte'
  import { writable } from 'svelte/store'

  const stores = {
    left: leftStore,
    right: rightStore
  } as const
</script>

<script lang="ts">
  type $$Props =
    | {
        /** Whether the XRHand should be matched with the left hand. */
        left: true
        right?: undefined
        hand?: undefined
      }
    | {
        /** Whether the XRHand should be matched with the right hand. */
        right: true
        left?: undefined
        hand?: undefined
      }
    | {
        /** Whether the XRHand should be matched with the left or right hand. */
        hand: 'left' | 'right'
        left?: undefined
        right?: undefined
      }

  export let left: $$Props['left'] = undefined
  export let right: $$Props['right'] = undefined
  export let hand: $$Props['hand'] = undefined

  type $$Events = {
    connected: XRHandEvent<'connected'>
    disconnected: XRHandEvent<'disconnected'>
    pinchstart: XRHandEvent<'pinchstart'>
    pinchend: XRHandEvent<'pinchend'>
  }

  const dispatch = createRawEventDispatcher<$$Events>()
  const { xr } = useThrelte().renderer
  const space = xr.getReferenceSpace()

  const handedness = writable<'left' | 'right'>(left ? 'left' : right ? 'right' : hand)
  $: handedness.set(left ? 'left' : right ? 'right' : (hand as 'left' | 'right'))
  $: handDispatchers[$handedness].set(dispatch)

  let children: Group

  /**
   * Currently children of a hand XRSpace or model will not
   * move relative to their parent, so this hack of checking wrist position
   * and syncing any slots is used.
   *
   * @todo(mp) investigate why this is happening and see if there's
   * a way to just parent to the hand to avoid this.
   */
  const { start, stop } = useTask(
    () => {
      const frame = xr.getFrame()
      const joint = inputSource!.get('wrist' as unknown as number)

      if (joint === undefined || space === null) return

      const pose = frame.getJointPose?.(joint, space)

      // This isn't correctly typed by @types/xr. Pose can also be null.
      if (pose === undefined || pose === null) return

      const { position, orientation } = pose.transform
      children.position.set(position.x, position.y, position.z)
      children.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w)
    },
    { autoStart: false }
  )

  $: if ($isHandTracking && ($$slots.wrist || $$slots.default) && inputSource) {
    start()
  } else {
    stop()
  }

  $: store = stores[$handedness]
  $: inputSource = $store?.inputSource
  $: model = $store?.model
</script>

{#if $store?.hand && $isHandTracking}
  <T is={$store.hand}>
    {#if $$slots.default === undefined}
      <T is={model} />
    {/if}
  </T>

  {#if $$slots['target-ray'] !== undefined}
    <T is={$store.targetRay}>
      <slot name="target-ray" />
    </T>
  {/if}
{/if}

{#if $isHandTracking}
  <ScenePortal>
    <T.Group bind:ref={children}>
      <slot name="wrist" />
      <slot />
    </T.Group>
  </ScenePortal>
{/if}
