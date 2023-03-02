<script lang="ts">
	import { T } from '@threlte/core'
	import { Environment, Float, HTML, useGltf } from '@threlte/extras'
	import { derived } from 'svelte/store'
	import type { Mesh } from 'three'
	import { Color, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	const gltf = useGltf<{
		nodes: {
			phone: Mesh
		}
		materials: {}
	}>('/models/phone/phone.glb')

	const phoneGeometry = derived(gltf, (gltf) => {
		if (!gltf) return
		return gltf.nodes.phone.geometry
	})

	const url = window.origin
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<T.PerspectiveCamera
	position={[50, 0, 0]}
	fov={20}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0)
	}}
	makeDefault
/>

<T.AmbientLight intensity={0.3} />

<Float scale={0.7}>
	<HTML rotation.y={90 * DEG2RAD} position.x={1.2} transform>
		<div class="phone-wrapper">
			<iframe title="" src={url} width="100%" height="100%" frameborder="0" />
		</div>
	</HTML>

	{#if $phoneGeometry}
		<T.Mesh
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
