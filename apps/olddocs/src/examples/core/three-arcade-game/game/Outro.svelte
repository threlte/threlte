<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Edges, Text } from '@threlte/extras'
  import { onDestroy } from 'svelte'
  import { tweened } from 'svelte/motion'
  import { Group, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { play, type ArcadeAudio } from '../sound'
  import { useTimeout } from './hooks/useTimeout'
  import { gameState } from './state'
  import ThrelteLogo from './ThrelteLogo.svelte'

  const { baseColor, score } = gameState

  const { timeout } = useTimeout()

  const logoScale = tweened(0)
  timeout(() => {
    logoScale.set(1)
  }, 1.5e3)

  const textScale = tweened(0)
  const textRotation = tweened(10)
  timeout(() => {
    textScale.set(1)
    textRotation.set(0)
  }, 200)

  let showPressSpaceToStart = false
  let blinkClock: 0 | 1 = 0
  timeout(() => {
    showPressSpaceToStart = true
  }, 5e3)

  let intervalHandler = setInterval(() => {
    if (!showPressSpaceToStart) return
    blinkClock = blinkClock ? 0 : 1
  }, 500)
  onDestroy(() => {
    clearInterval(intervalHandler)
  })

  let audio: ArcadeAudio | undefined = undefined
  audio = play('intro', {
    loop: true,
    volume: 1
  })
  onDestroy(() => {
    audio?.source.stop()
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      dir = -1
    } else if (e.key === 'ArrowRight') {
      dir = 1
    }
  }

  let rotationY = 0
  let dir = 1
  useTask((delta) => {
    rotationY += delta * dir
  })
</script>

<svelte:window on:keydown={onKeyDown} />

<T
  is={Group}
  position.z={-0.35}
>
  <ThrelteLogo positionZ={-1.2} />

  <T
    is={Group}
    scale={$textScale}
    position.z={1.3}
    rotation.x={-90 * DEG2RAD}
    rotation.z={$textRotation}
  >
    <T
      is={Mesh}
      position.y={-0.05}
    >
      <T
        is={PlaneGeometry}
        args={[11, 2]}
      />
      <T
        is={MeshBasicMaterial}
        transparent
        opacity={0}
      />
      <Edges color={$baseColor} />
    </T>
    <Text
      font="/fonts/beefd.ttf"
      anchorX="50%"
      anchorY="50%"
      textAlign="center"
      fontSize={0.5}
      color={$baseColor}
      text={`THRELTE MASTER\nSCORE ${$score}`}
    />
  </T>
</T>

{#if showPressSpaceToStart}
  <T
    is={Group}
    scale={$textScale}
    position.z={3.3}
    rotation.x={-90 * DEG2RAD}
    visible={!!blinkClock}
  >
    <Text
      font="/fonts/beefd.ttf"
      anchorX="50%"
      anchorY="50%"
      textAlign="center"
      fontSize={0.35}
      color={$baseColor}
      text={`PRESS SPACE TO RESTART`}
    />
  </T>
{/if}
