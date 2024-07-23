<script lang="ts">
  import { T } from '@threlte/core'
  import { tweened } from 'svelte/motion'
  import { derived } from 'svelte/store'
  import { BackSide, Color, PerspectiveCamera } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import Arena from './Arena.svelte'
  import Ball from './Ball/Ball.svelte'
  import GameSceneRendering from './GameSceneRendering.svelte'
  import Intro from './Intro.svelte'
  import Level from './levels/Level.svelte'
  import Outro from './Outro.svelte'
  import Player from './Player.svelte'
  import { gameState, nextLevel, reset, restart, startGame } from './state'
  import Ui from './UI.svelte'

  const { state, levelIndex, gameScene, gameCamera, debug, orbitControls } = gameState

  let camera: PerspectiveCamera
  $: gameCamera.set(camera)

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'd') {
      $debug = !$debug
    }
    if (e.key === 'o') {
      $orbitControls = !$orbitControls
    }
    if (e.key !== ' ' || $state === 'level-loading') return
    e.preventDefault()

    if ($state === 'await-intro-skip') {
      startGame()
    } else if ($state === 'game-over') {
      restart()
    } else if ($state === 'menu') {
      startGame()
    } else if ($state === 'level-complete') {
      nextLevel()
    } else if ($state === 'await-ball-spawn') {
      $state = 'playing'
    } else if ($state === 'outro') {
      reset()
    }
  }

  $: showLevel =
    $state === 'level-loading' ||
    $state === 'level-complete' ||
    $state === 'playing' ||
    $state === 'await-ball-spawn' ||
    $state === 'game-over'

  $: showIntro = $state === 'intro' || $state === 'await-intro-skip'
  $: showOutro = $state === 'outro'

  const machineIsOff = derived(state, (state) => state === 'off')

  $: backgroundColor = $machineIsOff ? 'black' : '#08060a'

  const tweenedBackgroundColor = tweened(new Color('black'), {
    duration: 1e3
  })
  $: tweenedBackgroundColor.set(new Color(backgroundColor))
</script>

<svelte:window on:keypress={onKeyPress} />

<GameSceneRendering />

<T.Scene
  oncreate={({ ref }) => {
    gameScene.set(ref)
  }}
>
  <T.Mesh>
    <T.SphereGeometry args={[50, 32, 32]} />
    <T.MeshBasicMaterial
      side={BackSide}
      color={$tweenedBackgroundColor}
    />
  </T.Mesh>

  <T.PerspectiveCamera
    oncreate={({ ref }) => {
      camera = ref
    }}
    manual
    args={[50, 4 / 3, 0.1, 100]}
    position={[0, 10, 0]}
    rotation.x={-90 * DEG2RAD}
  />

  <T.AmbientLight intensity={0.3} />

  <T.DirectionalLight position={[4, 10, 2]} />

  {#if showIntro}
    <Intro />
  {:else if showOutro}
    <Outro />
  {:else if $state !== 'off'}
    <Ball />
    <Arena />
    <Player />
    {#if showLevel}
      {#key $levelIndex}
        <Level />
      {/key}
    {/if}
    <Ui />
  {/if}
</T.Scene>
