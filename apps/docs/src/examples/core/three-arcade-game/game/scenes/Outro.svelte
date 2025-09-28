<script lang="ts">
  import { MathUtils } from 'three'
  import { T } from '@threlte/core'
  import { Edges, Text } from '@threlte/extras'
  import { onDestroy } from 'svelte'
  import { Tween } from 'svelte/motion'
  import type { ArcadeAudio } from '../sound'
  import { useTimeout } from '../hooks/useTimeout'
  import { game } from '../Game.svelte'
  import ThrelteLogo from '../objects/ThrelteLogo.svelte'

  const { timeout } = useTimeout()
  let direction = $state<1 | -1>(1)
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
  let blinkClock = $state<0 | 1>(0)

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
  audio = game.sound.play('intro', {
    loop: true,
    volume: 1
  })
  onDestroy(() => {
    audio?.source.stop()
  })

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      direction = -1
    } else if (e.key === 'ArrowRight') {
      direction = 1
    }
  }
</script>

<svelte:window {onkeydown} />

<T.Group position.z={-0.35}>
  <ThrelteLogo
    positionZ={-1.2}
    {direction}
  />

  <T.Group
    scale={textScale.current}
    position.z={1.3}
    rotation.x={-90 * MathUtils.DEG2RAD}
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
    scale={textScale.current}
    position.z={3.3}
    rotation.x={-90 * MathUtils.DEG2RAD}
    visible={!!blinkClock}
  >
    <Text
      font="/fonts/beefd.ttf"
      anchorX="50%"
      anchorY="50%"
      textAlign="center"
      fontSize={0.35}
      color={game.baseColor}
      text="PRESS SPACE TO RESTART"
    />
  </T.Group>
{/if}
