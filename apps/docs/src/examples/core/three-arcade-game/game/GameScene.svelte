<script lang="ts">
	import { Three2, useFrame } from '@threlte/core'
	import {
		AmbientLight,
		Color,
		DirectionalLight,
		GridHelper,
		LineBasicMaterial,
		NearestFilter,
		PerspectiveCamera,
		Scene,
		WebGLRenderTarget
	} from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { arcadeMachineScene, gameScene, gameTexture } from '../stores'
	import Arena from './Arena.svelte'
	import Ball from './Ball/Ball.svelte'
	import { arenaWidth } from './config'
	import Intro from './Intro.svelte'
	import Level from './levels/Level.svelte'
	import Outro from './Outro.svelte'
	import Player from './Player.svelte'
	import { averageScreenColor, gameState, nextLevel, reset, restart, startGame } from './state'
	import Ui from './UI.svelte'

	let camera: PerspectiveCamera
	let rt: WebGLRenderTarget
	let rt2: WebGLRenderTarget

	$: if (rt) {
		$gameTexture = rt.texture
		rt.texture.minFilter = NearestFilter
		rt.texture.magFilter = NearestFilter
	}

	const textureWidth = 200
	const textureHeight = Math.round((textureWidth * 3) / 4)

	var pixels = new Uint8Array(textureWidth * textureHeight * 4)

	const samplePixels = () => {
		let r = 0
		let g = 0
		let b = 0

		for (let index = 0; index < pixels.length; index += 8) {
			r += pixels[index]
			g += pixels[index + 1]
			b += pixels[index + 2]
		}

		r = r / pixels.length
		g = g / pixels.length
		b = b / pixels.length

		averageScreenColor.update((c) => {
			c.setRGB(r / 255, g / 255, b / 255)
			return c
		})
	}

	let frame = 0
	let renderEvery = 2
	useFrame(({ renderer }) => {
		if (!camera || !rt || !renderer || !$gameScene || !$arcadeMachineScene) return

		frame += 1

		$arcadeMachineScene.visible = false
		$gameScene.visible = true

		if (frame % renderEvery === 0) {
			renderer.setRenderTarget(rt)
		} else {
			renderer.setRenderTarget(rt2)
		}

		renderer.render($gameScene, camera)

		if (frame % renderEvery === 0) {
			const context = renderer.getContext()
			context.readPixels(
				0,
				0,
				textureWidth,
				textureHeight,
				context.RGBA,
				context.UNSIGNED_BYTE,
				pixels
			)
			samplePixels()
		}

		renderer.setRenderTarget(null)
		$gameScene.visible = false
		$arcadeMachineScene.visible = true
	})

	const { state, levelIndex, baseColor } = gameState
	const onKeyPress = (e: KeyboardEvent) => {
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
</script>

<svelte:window on:keypress={onKeyPress} />

<Three2 type={Scene} bind:ref={$gameScene}>
	<Three2 type={Color} args={['#060508']} attach="background" />

	<Three2 type={WebGLRenderTarget} bind:ref={rt} args={[textureWidth, textureHeight]} />
	<Three2 type={WebGLRenderTarget} bind:ref={rt2} args={[textureWidth, textureHeight]} />

	<Three2
		bind:ref={camera}
		manual
		args={[50, 4 / 3, 0.1, 100]}
		type={PerspectiveCamera}
		position={[0, 10, 0]}
		rotation.x={-90 * DEG2RAD}
	/>

	<Three2 type={AmbientLight} intensity={0.3} />

	<Three2 type={DirectionalLight} position={[4, 10, 2]} />

	{#if showIntro}
		<Intro />
	{:else if showOutro}
		<Outro />
	{:else}
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
</Three2>
