<script lang="ts">
	import { T } from '@threlte/core'
	import { tweened } from 'svelte/motion'
	import { derived } from 'svelte/store'
	import {
		AmbientLight,
		BackSide,
		Color,
		DirectionalLight,
		Mesh,
		MeshBasicMaterial,
		PerspectiveCamera,
		Scene,
		SphereGeometry,
		WebGLRenderTarget
	} from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
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
	let rt: WebGLRenderTarget
	let rt2: WebGLRenderTarget

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

<T is={Scene} bind:ref={$gameScene}>
	<T is={Mesh}>
		<T is={SphereGeometry} args={[50, 32, 32]} />
		<T is={MeshBasicMaterial} side={BackSide} color={$tweenedBackgroundColor} />
	</T>

	<T
		bind:ref={camera}
		manual
		args={[50, 4 / 3, 0.1, 100]}
		is={PerspectiveCamera}
		position={[0, 10, 0]}
		rotation.x={-90 * DEG2RAD}
	/>

	<T is={AmbientLight} intensity={0.3} />

	<T is={DirectionalLight} position={[4, 10, 2]} />

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
</T>
