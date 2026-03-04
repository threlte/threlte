<script lang="ts">
  import { Group } from 'three'
  import { T, useThrelte, useTask } from '@threlte/core'
  import type { XRHandEvents } from '../types.js'
  import { isHandTracking, handEvents } from '../internal/state.svelte.js'
  import { hands } from '../hooks/useHand.svelte.js'
  import type { Snippet } from 'svelte'

  type Props = {
    children?: Snippet
    targetRay?: Snippet
    wrist?: Snippet
  } & XRHandEvents &
    (
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
    )

  const {
    left,
    right,
    hand,
    onconnected,
    ondisconnected,
    onpinchend,
    onpinchstart,
    children,
    targetRay,
    wrist
  }: Props = $props()

  const { scene, renderer, scheduler, renderStage } = useThrelte()

  const handedness = $derived<'left' | 'right'>(left ? 'left' : right ? 'right' : hand ?? 'left')

  $effect.pre(() => {
    handEvents[handedness] = {
      onconnected,
      ondisconnected,
      onpinchend,
      onpinchstart
    }

    return () => {
      handEvents[handedness] = undefined
    }
  })

  const group = new Group()

  /**
   * Currently children of a hand XRSpace or model will not
   * move relative to their parent, so this hack of checking wrist position
   * and syncing any snippets is used.
   *
   * @todo(mp) investigate why this is happening and see if there's
   * a way to just parent to the hand to avoid this.
   */
  useTask(
    () => {
      const frame = renderer.xr.getFrame()
      const space = renderer.xr.getReferenceSpace()
      const joint = inputSource?.get('wrist')

      if (joint === undefined || space === null) return

      const pose = frame.getJointPose?.(joint, space)

      // This isn't correctly typed by @types/xr. Pose can also be null.
      if (pose === undefined || pose === null) return

      const { position, orientation } = pose.transform
      group.position.set(position.x, position.y, position.z)
      group.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w)
    },
    {
      stage: scheduler.createStage(Symbol('xr-hand-stage'), { before: renderStage }),
      running: () =>
        isHandTracking.current &&
        (wrist !== undefined || children !== undefined) &&
        inputSource !== undefined
    }
  )

  const xrHand = $derived(hands[handedness])
  const inputSource = $derived(xrHand?.inputSource)
  const model = $derived(xrHand?.model)
</script>

{#if xrHand?.hand && isHandTracking.current}
  <T
    is={xrHand.hand}
    attach={scene}
  >
    {#if children === undefined}
      <T is={model} />
    {/if}
  </T>

  {#if targetRay !== undefined}
    <T is={xrHand.targetRay}>
      {@render targetRay()}
    </T>
  {/if}
{/if}

{#if isHandTracking.current}
  <T
    is={group}
    attach={scene}
  >
    {@render wrist?.()}
    {@render children?.()}
  </T>
{/if}
