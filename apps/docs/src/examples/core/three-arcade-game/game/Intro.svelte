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
  let audio: ArcadeAudio | undefined = undefined

  const logoScale = new Tween(0)

  const showLogoAfter = 2e3
  const showThrelteAfter = showLogoAfter + 1e3
  const showPressSpaceToStartAfter = showThrelteAfter + 2e3

  timeout(() => {
    audio = play('levelSlow', {
      loop: true,
      volume: 1
    })
    logoScale.set(1)
    game.state = 'await-intro-skip'
  }, showLogoAfter)

  const textScale = new Tween(0)
  const textRotation = new Tween(10)
  timeout(() => {
    textScale.set(1)
    textRotation.set(0)
  }, showThrelteAfter)

  let showPressSpaceToStart = false
  let blinkClock: 0 | 1 = 0
  timeout(() => {
    showPressSpaceToStart = true
  }, showPressSpaceToStartAfter)

  let intervalHandler = setInterval(() => {
    if (!showPressSpaceToStart) return
    blinkClock = blinkClock ? 0 : 1
  }, 500)
  onDestroy(() => {
    clearInterval(intervalHandler)
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

  onDestroy(() => {
    audio?.source.stop()
  })
</script>

<svelte:window on:keydown={onKeyDown} />

<T.Group position.z={-0.35}>
  <ThrelteLogo
    positionZ={-1.2}
    scale={logoScale.current}
  />

  <T.Group
    scale={textScale.current}
    position.z={1.3}
    rotation.x={-90 * DEG2RAD}
    rotation.z={textRotation.current}
  >
    <T.Mesh position.y={-0.05}>
      <T.PlaneGeometry args={[5.3, 1.8]} />
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
      text={`THRELTE\nMASTER`}
    />
  </T.Group>
</T.Group>

{#if showPressSpaceToStart}
  <T.Group
    scale={textScale.current}
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
      text={`PRESS SPACE TO START`}
    />
  </T.Group>
{/if}
