<script
  lang="ts"
  context="module"
>
  import { T } from '@threlte/core'
  import { Edges } from '@threlte/extras'
  import { Collider, RigidBody, type ContactEvent } from '@threlte/rapier'
  import { createEventDispatcher } from 'svelte'
  import { cubicIn } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import type { Writable } from 'svelte/store'
  import { clamp } from 'three/src/math/MathUtils.js'
  import { playFromGroup } from '../../sound'
  import { blinkClock } from '../state'

  export type BlockData = {
    position: {
      x: number
      z: number
    }
    staticColors: Writable<{
      inner: string
      outer: string
    }>
    blinkingColors: Writable<
      | {
          innerA: string
          innerB: string
          outerA: string
          outerB: string
        }
      | undefined
    >
    hit: Writable<boolean>
    size: number
    freeze: Writable<boolean>
  }
</script>

<script lang="ts">
  export let position: BlockData['position']
  export let size: BlockData['size']
  export let hit: BlockData['hit']
  export let freeze: BlockData['freeze']
  export let staticColors: BlockData['staticColors']
  export let blinkingColors: BlockData['blinkingColors']

  const dispatch = createEventDispatcher<{
    hit: void
  }>()

  const scale = tweened(0)
  scale.set(1, {
    easing: cubicIn
  })

  $: innerColor = $blinkingColors
    ? $blinkClock === 0
      ? $blinkingColors.innerA
      : $blinkingColors.innerB
    : $staticColors.inner

  $: outerColor = $blinkingColors
    ? $blinkClock === 0
      ? $blinkingColors.outerA
      : $blinkingColors.outerB
    : $staticColors.outer

  const onContact = (e: ContactEvent) => {
    if (e.detail.totalForceMagnitude > 2000 || e.detail.totalForceMagnitude < 300) return
    const volume = clamp(Math.max(e.detail.totalForceMagnitude, 0) / 2000, 0, 1)
    playFromGroup('bounce', {
      volume
    })
  }
</script>

<T.Group
  position.x={position.x}
  position.z={position.z}
>
  <RigidBody
    type={!$hit || $freeze ? 'fixed' : 'dynamic'}
    canSleep={false}
    dominance={$hit ? -1 : 1}
    enabledTranslations={[true, false, true]}
  >
    <Collider
      shape="cuboid"
      args={[size / 2, 1 / 2, size / 2]}
      oncontact={onContact}
      oncollisionexit={() => dispatch('hit')}
      mass={1}
    >
      <T.Mesh scale={$scale}>
        <T.BoxGeometry args={[size, 1, size]} />
        <T.MeshStandardMaterial
          color={innerColor}
          transparent
          opacity={0.6}
        />
        <Edges
          color={outerColor}
          scale={1.01}
        />
      </T.Mesh>
    </Collider>
  </RigidBody>
</T.Group>
