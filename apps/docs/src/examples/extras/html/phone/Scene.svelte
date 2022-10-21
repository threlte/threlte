<script lang="ts">
	import { AmbientLight, Mesh, PerspectiveCamera, useThrelte } from '@threlte/core'
	import { Environment, Float, HTML, useGltf } from '@threlte/extras'
	import { spring } from 'svelte/motion'
	import { derived } from 'svelte/store'
	import type { Mesh as ThreeMesh } from 'three'
	import { Color, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	const { pointer } = useThrelte()

	const offsetX = spring($pointer.x * 10)
	$: offsetX.set($pointer.x * 10)
	const offsetY = spring($pointer.y * 10)
	$: offsetY.set($pointer.y * 10)

	const { gltf } = useGltf<'phone'>('/models/phone/phone.glb')
	const phoneGeometry = derived(gltf, (gltf) => {
		if (!gltf) return
		return (gltf.nodes.phone as ThreeMesh).geometry
	})

	const url = window.origin
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<PerspectiveCamera position={{ z: $offsetX, x: 50, y: -$offsetY }} fov={20} lookAt={{}} />

<AmbientLight intensity={0.3} />

<Float scale={0.7}>
	<HTML rotation={{ y: DEG2RAD * 90 }} position={{ x: 1.2 }} transform>
		<div class="phone-wrapper">
			<iframe title="" src={url} width="100%" height="100%" frameborder="0" />
		</div>
	</HTML>

	{#if $phoneGeometry}
		<Mesh
			scale={5.65}
			geometry={$phoneGeometry}
			material={new MeshStandardMaterial({
				color: new Color('#FF3F00').convertSRGBToLinear()
			})}
		/>
	{/if}
</Float>

<style>
	.phone-wrapper {
		height: 848px;
		width: 420px;
		border-radius: 63px;
		overflow: hidden;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
</style>
