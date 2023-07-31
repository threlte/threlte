<script lang="ts">
	import { useThrelte, useRender } from '@threlte/core';
	import {
		EffectComposer,
		EffectPass,
		RenderPass,
		OutlineEffect,
		BlendFunction
	} from 'postprocessing';

	export let selectedMesh;

	const { scene, renderer, camera } = useThrelte();

	const composer = new EffectComposer(renderer);

	const setupEffectComposer = (camera, selectedMesh) => {
		composer.addPass(new RenderPass(scene, camera));

		const outlineEffect = new OutlineEffect(scene, camera, {
			blendFunction: BlendFunction.ALPHA,
			edgeStrength: 100,
			pulseSpeed: 0.0,
			visibleEdgeColor: 'white',
			hiddenEdgeColor: 0x9900ff,
			xRay: true,
			blur: true
		});
		if (selectedMesh !== undefined) {
			outlineEffect.selection.set([selectedMesh]);
		}
		composer.addPass(new EffectPass(camera, outlineEffect));
	};

	$: setupEffectComposer($camera, selectedMesh);

	useRender((_, delta) => {
		composer.render(delta);
	});
</script>
