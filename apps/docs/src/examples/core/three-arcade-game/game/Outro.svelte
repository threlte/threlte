<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Edges, Text } from '@threlte/extras'
  import { onDestroy } from 'svelte'
  import { Tween } from 'svelte/motion'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import { play, type ArcadeAudio } from '../sound'
  import { useTimeout } from './hooks/useTimeout'
  import { game } from './Game.svelte'
  import ThrelteLogo from './ThrelteLogo.svelte'

  const { timeout } = useTimeout()

  const logoScale = new Tween(0)
  timeout(() => {
    logoScale.set(1)
  }, 1.5e3)

  const textScale = new Tween(0)
  const textRotation = new Tween(10)

  timeout(() => {
    textScale.set(1)
    textRotation.set(0)
  }, 200)

  let showPressSpaceToStart = $state(false)
  let blinkClock: 0 | 1 = $state(0)

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

<T.Group position.z={-0.35}>
  <ThrelteLogo positionZ={-1.2} />

  <T.Group
    scale={textScale}
    position.z={1.3}
    rotation.x={-90 * DEG2RAD}
    rotation.z={textRotation}
  >
    <T.Mesh position.y={-0.05}>
      <T.PlaneGeometry args={[11, 2]} />
      <T.MeshBasicMaterial
        transparent
        opacity={0}
      />
      <Edges color={game.baseColor} />
    </T.Mesh>
    <Text
      font="/fonts/beefd.ttf"
      anchorX="50%"
      anchorY="50%"
      textAlign="center"
      fontSize={0.5}
      color={game.baseColor}
      text={`THRELTE MASTER\nSCORE ${game.score}`}
    />
  </T.Group>
</T.Group>

{#if showPressSpaceToStart}
  <T.Group
    scale={textScale}
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
      color={game.baseColor}
      text={`PRESS SPACE TO RESTART`}
    />
  </T.Group>
{/if}
