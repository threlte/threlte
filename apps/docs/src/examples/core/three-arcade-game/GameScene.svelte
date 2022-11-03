<script lang="ts">
	import { Three2, useFrame, useTexture } from '@threlte/core'
	import { GridHelper } from 'three'
	import type { Texture } from 'three'
	import { NearestFilter } from 'three'
	import { Color } from 'three'
	import {
		AmbientLight,
		DirectionalLight,
		Mesh,
		MeshBasicMaterial,
		PerspectiveCamera,
		PlaneGeometry,
		Scene,
		WebGLRenderTarget
	} from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Arena from './Arena.svelte'
	import Level1 from './levels/Level1.svelte'
	import Player from './Player.svelte'
	import PlayingBall from './PlayingBall.svelte'
	import { arcadeMachineScene, gameScene, gameTexture } from './stores'
	import { arenaWidth } from './config'
	import { LineBasicMaterial } from 'three'
	import { averageScreenColor } from './game/state'

	let ballsInGame = 0

	let camera: PerspectiveCamera
	let rt: WebGLRenderTarget

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

	useFrame(({ renderer }) => {
		if (!camera || !rt || !renderer || !$gameScene || !$arcadeMachineScene) return

		$arcadeMachineScene.visible = false
		$gameScene.visible = true
		renderer.setRenderTarget(rt)
		renderer.render($gameScene, camera)

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

		renderer.setRenderTarget(null)
		$gameScene.visible = false
		$arcadeMachineScene.visible = true
	})

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key === ' ') {
			ballsInGame++
		}
	}
</script>

<svelte:window on:keypress={onKeyPress} />

<Three2 type={Scene} bind:ref={$gameScene}>
	<Three2 type={Color} args={['#060508']} attach="background" />

	<Three2 type={GridHelper} args={[arenaWidth, 8]} position.y={-0.5}>
		<Three2 type={LineBasicMaterial} color="red" transparent opacity={0.1} />
	</Three2>

	<Three2 type={WebGLRenderTarget} bind:ref={rt} args={[textureWidth, textureHeight]} />

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

	{#each new Array(ballsInGame) as _, i}
		<PlayingBall
			on:ballOut={() => {
				ballsInGame -= 1
			}}
		/>
	{/each}

	<Arena />

	<Player />

	<Level1 />
</Three2>
