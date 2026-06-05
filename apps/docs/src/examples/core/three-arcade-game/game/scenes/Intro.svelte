<script lang="ts">
  import { MathUtils } from 'three'
  import { T } from '@threlte/core'
  import { Audio, Edges, Text } from '@threlte/extras'
  import { Tween } from 'svelte/motion'
  import { useTimeout } from '../hooks/useTimeout.svelte'
  import { useArcadeControls } from '../controls.svelte'
  import { game } from '../Game.svelte'
  import ThrelteLogo from '../objects/ThrelteLogo.svelte'

  const controls = useArcadeControls()
  const left = controls.action('left')
  const right = controls.action('right')

  $effect(() => {
    if (left.justPressed) direction = -1
    else if (right.justPressed) direction = 1
  })

  const { timeout } = useTimeout()
  let direction = $state<1 | -1>(1)
  let playMusic = $state(false)

  const logoScale = new Tween(0)

  const showLogoAfter = 2e3
  const showThrelteAfter = showLogoAfter + 1e3
  const showPressSpaceToStartAfter = showThrelteAfter + 2e3

  timeout(() => {
    playMusic = true
    logoScale.set(1)
    game.state = 'await-intro-skip'
  }, showLogoAfter)

  const textScale = new Tween(0)
  const textRotation = new Tween(10)
  timeout(() => {
    textScale.set(1)
    textRotation.set(0)
  }, showThrelteAfter)

  let showPressSpaceToStart = $state(false)
  let blinkClock = $state<0 | 1>(0)

  timeout(() => {
    showPressSpaceToStart = true
  }, showPressSpaceToStartAfter)

  $effect(() => {
    const intervalHandler = setInterval(() => {
      if (!showPressSpaceToStart) return
      blinkClock = blinkClock ? 0 : 1
    }, 500)

    return () => clearInterval(intervalHandler)
  })
</script>

{#if playMusic}
  <Audio
    src="/audio/level_slow.m4a"
    loop
    autoplay
  />
{/if}

<T.Group position.z={-0.35}>
  <ThrelteLogo
    positionZ={-1.2}
    scale={logoScale.current}
    {direction}
  />

  <T.Group
    scale={textScale.current}
    position.z={1.3}
    rotation.x={MathUtils.degToRad(-90)}
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
    rotation.x={MathUtils.degToRad(-90)}
    visible={!!blinkClock}
  >
    <Text
      font="/fonts/beefd.ttf"
      anchorX="50%"
      anchorY="50%"
      textAlign="center"
      fontSize={0.35}
      color={game.baseColor}
      text="PRESS SPACE TO START"
    />
  </T.Group>
{/if}
