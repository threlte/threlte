<script lang="ts">
  import { T } from '@threlte/core'
  import { Tween } from 'svelte/motion'
  import { BackSide, Color, MathUtils } from 'three'
  import Arena from './objects/Arena.svelte'
  import Ball from './objects/Ball/Ball.svelte'
  import Renderer from './Renderer.svelte'
  import Intro from './scenes/Intro.svelte'
  import Level from './scenes/Level.svelte'
  import Outro from './scenes/Outro.svelte'
  import Player from './objects/Player.svelte'
  import { game } from './Game.svelte'
  import GUI from './GUI.svelte'

  const onkeypress = (e: KeyboardEvent) => {
    if (e.key === 'd') {
      game.debug = !game.debug
    }
    if (e.key === 'o') {
      game.orbitControls = !game.orbitControls
    }
    if (e.key !== ' ' || game.state === 'level-loading') return
    e.preventDefault()

    if (game.state === 'await-intro-skip') {
      game.startGame()
    } else if (game.state === 'game-over') {
      game.restart()
    } else if (game.state === 'menu') {
      game.startGame()
    } else if (game.state === 'level-complete') {
      game.nextLevel()
    } else if (game.state === 'await-ball-spawn') {
      game.state = 'playing'
    } else if (game.state === 'outro') {
      game.reset()
    }
  }

  let showLevel = $derived(
    game.state === 'level-loading' ||
      game.state === 'level-complete' ||
      game.state === 'playing' ||
      game.state === 'await-ball-spawn' ||
      game.state === 'game-over'
  )

  let showIntro = $derived(game.state === 'intro' || game.state === 'await-intro-skip')
  let showOutro = $derived(game.state === 'outro')

  let machineIsOff = $derived(game.state === 'off' ? true : false)
  let backgroundColor = $derived(machineIsOff ? 'black' : '#08060a')

  const tweenedBackgroundColor = new Tween(new Color('black'), {
    duration: 1e3
  })
  $effect(() => {
    tweenedBackgroundColor.set(new Color(backgroundColor))
  })
</script>

<svelte:window {onkeypress} />

<Renderer />

<T.Scene bind:ref={game.gameScene}>
  <T.Mesh>
    <T.SphereGeometry args={[50, 32, 32]} />
    <T.MeshBasicMaterial
      side={BackSide}
      color={tweenedBackgroundColor.current}
    />
  </T.Mesh>

  <T.PerspectiveCamera
    bind:ref={game.gameCamera}
    manual
    args={[50, 4 / 3, 0.1, 100]}
    position={[0, 10, 0]}
    rotation.x={-90 * MathUtils.DEG2RAD}
  />

  <T.AmbientLight intensity={0.3} />

  <T.DirectionalLight position={[4, 10, 2]} />

  {#if showIntro}
    <Intro />
  {:else if showOutro}
    <Outro />
  {:else if game.state !== 'off'}
    <Ball />
    <Arena />
    <Player />
    {#if showLevel}
      {#key game.levelIndex}
        <Level />
      {/key}
    {/if}
    <GUI />
  {/if}
</T.Scene>
