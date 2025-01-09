<script
  lang="ts"
  module
>
  import type { BlockData } from './types'
  import { T } from '@threlte/core'
  import { Edges } from '@threlte/extras'
  import { Collider, RigidBody, type ContactEvent } from '@threlte/rapier'
  import { cubicIn } from 'svelte/easing'
  import { Tween } from 'svelte/motion'
  import { clamp } from 'three/src/math/MathUtils.js'
  import { playFromGroup } from '../../sound'
  import { game } from '../Game.svelte'
</script>

<script lang="ts">
  type Props = {
    position: BlockData['position']
    size: BlockData['size']
    hit: BlockData['hit']
    freeze: BlockData['freeze']
    staticColors: BlockData['staticColors']
    blinkingColors: BlockData['blinkingColors']
    onHit: () => void
  }
  let { position, size, hit, freeze, staticColors, blinkingColors, onHit }: Props = $props()

  const scale = new Tween(0)
  scale.set(1, {
    easing: cubicIn
  })

  let innerColor = $derived(
    blinkingColors
      ? game.blinkClock === 0
        ? blinkingColors.innerA
        : blinkingColors.innerB
      : staticColors.inner
  )

  let outerColor = $derived(
    blinkingColors
      ? game.blinkClock === 0
        ? blinkingColors.outerA
        : blinkingColors.outerB
      : staticColors.outer
  )

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
    type={!hit || freeze ? 'fixed' : 'dynamic'}
    canSleep={false}
    dominance={hit ? -1 : 1}
    enabledTranslations={[true, false, true]}
  >
    <Collider
      shape="cuboid"
      args={[size / 2, 1 / 2, size / 2]}
      oncontact={onContact}
      oncollisionexit={() => onHit?.()}
      mass={1}
    >
      <T.Mesh scale={scale.current}>
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
