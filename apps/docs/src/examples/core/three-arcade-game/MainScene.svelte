<script lang="ts">
	import { useThrelte } from '@threlte/core'
	import {
		BlendFunction,
		BloomEffect,
		BrightnessContrastEffect,
		EffectComposer,
		EffectPass,
		KernelSize,
		RenderPass,
		SMAAEffect,
		SMAAPreset
	} from 'postprocessing'
	import { onDestroy } from 'svelte'
	import ArcadeMachineScene from './ArcadeMachineScene.svelte'
	import GameScene from './game/GameScene.svelte'
	import { blinkClock } from './game/state'

	// const unrealBloomPass = new UnrealBloomPass(new Vector2(512, 512), 0.7, 1, 0.25)

	const ctx = useThrelte()
	const { camera, renderer, scene } = ctx

	const intervalHandler = setInterval(() => {
		blinkClock.update((c) => (c === 0 ? 1 : 0))
	}, 96)
	onDestroy(() => {
		clearInterval(intervalHandler)
	})

	const disposables: { dispose: () => void }[] = []

	const addComposerAndPasses = () => {
		const composer = new EffectComposer(renderer)
		ctx.composer = composer as any

		const renderPass = new RenderPass(scene, $camera)

		const bloomEffect = new BloomEffect({
			intensity: 1,
			luminanceThreshold: 0.15,
			height: 512,
			width: 512,
			luminanceSmoothing: 0,
			mipmapBlur: true,
			kernelSize: KernelSize.MEDIUM,
			blendFunction: BlendFunction.SCREEN
		})
		bloomEffect.luminancePass.enabled = true
		;(bloomEffect as any).ignoreBackground = true
		const bloomPass = new EffectPass($camera, bloomEffect)

		const brightnessContrastEffect = new BrightnessContrastEffect({
			brightness: 0,
			contrast: 0.1
		})
		const brightnessContrastPass = new EffectPass($camera, brightnessContrastEffect)

		const smaaEffect = new SMAAEffect({
			preset: SMAAPreset.LOW
		})
		const smaaPass = new EffectPass($camera, smaaEffect)

		composer.addPass(renderPass)
		composer.addPass(bloomPass)
		composer.addPass(brightnessContrastPass)
		composer.addPass(smaaPass)

		disposables.push(bloomEffect)
		disposables.push(brightnessContrastEffect)
	}

	$: if (renderer && $camera) {
		disposables.forEach((d) => d.dispose())
		disposables.length = 0
		addComposerAndPasses()
	}
</script>

<ArcadeMachineScene />

<GameScene />
