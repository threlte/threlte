<script lang="ts">
	import { useRender, useThrelte } from '@threlte/core'
	import {
		ChromaticAberrationEffect,
		EffectComposer,
		EffectPass,
		NoiseEffect,
		RenderPass,
		ToneMappingEffect,
		ToneMappingMode,
		SMAAEffect,
		BlendFunction
	} from 'postprocessing'

	const { renderer, scene, camera } = useThrelte()

	if (!renderer) throw new Error('No renderer')

	// @ts-expect-error
	const composer = new EffectComposer(renderer)

	const setup = () => {
		composer.removeAllPasses()
		// @ts-expect-error
		composer.addPass(new RenderPass(scene, camera.current))

		const chromaticAberrationEffect = new ChromaticAberrationEffect()
		const toneMappingEffect = new ToneMappingEffect({
			mode: ToneMappingMode.ACES_FILMIC
		})
		const noiseEffect = new NoiseEffect({
			blendFunction: BlendFunction.COLOR_DODGE
		})
		noiseEffect.blendMode.opacity.value = 0.1
		const smaaEffect = new SMAAEffect()

		composer.addPass(
			new EffectPass(
				// @ts-expect-error
				camera.current,
				smaaEffect
			)
		)

		composer.addPass(
			new EffectPass(
				// @ts-expect-error
				camera.current,
				// noiseEffect,
				// chromaticAberrationEffect,
				toneMappingEffect
			)
		)
	}

	$: $camera && setup()

	useRender(() => {
		composer.render()
	})
</script>
