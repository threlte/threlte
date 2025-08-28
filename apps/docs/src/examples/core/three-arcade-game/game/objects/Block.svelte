<script lang="ts">
  import type { BlockData } from '../objects/types'
  import { T } from '@threlte/core'
  import { Edges } from '@threlte/extras'
  import { Collider, RigidBody } from '@threlte/rapier'
  import { cubicIn } from 'svelte/easing'
  import { Tween } from 'svelte/motion'
  import { clamp } from 'three/src/math/MathUtils.js'
  import { game } from '../Game.svelte'

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
      oncontact={(e) => {
        if (e.totalForceMagnitude > 2000 || e.totalForceMagnitude < 300) return
        const volume = clamp(Math.max(e.totalForceMagnitude, 0) / 2000, 0, 1)
        game.sound.playFromGroup('bounce', {
          volume
        })
      }}
      oncollisionexit={() => {
        if (!hit) {
          onHit?.()
        }
      }}
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
