<script lang="ts">
	import { types } from '@theatre/core'
	import { OrbitControls, T, Three, useTexture } from '@threlte/core'
	import { Environment } from '@threlte/extras'
	import { Editable } from '@threlte/theatre'
	import { DoubleSide } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	const map = useTexture('/assets/theatre/editable/textures/texture.jpg')
	const normalMap = useTexture('/assets/theatre/editable/textures/normal_map.jpg')
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<Editable
	name="Camera Manager"
	props={{
		camera: types.number(1, {
			range: [1, 2],
			label: 'Camera',
			nudgeMultiplier: 99999999 // this trick only works with two scenes
		})
	}}
	let:values
>
	{#if values.camera === 1}
		<T.PerspectiveCamera makeDefault position.z={10} position.x={3} position.y={1}>
			<OrbitControls target={{ y: 1 }} />
		</T.PerspectiveCamera>
	{:else if values.camera === 2}
		<T.PerspectiveCamera makeDefault position.y={3} position.z={10}>
			<OrbitControls target={{ y: 1 }} />
		</T.PerspectiveCamera>
	{/if}
</Editable>

<T.Mesh castShadow position.y={1} rotation.x={90 * DEG2RAD}>
	<Editable name="Mesh / Transforms" transform controls />
	<T.TorusGeometry args={[1, 0.3, 16, 100]} />
	<T.MeshStandardMaterial let:ref>
		<Editable
			name="Mesh / Material / Maps"
			props={{
				useMap: types.boolean(true, { label: 'Use Map' }),
				useNormalMap: types.boolean(true, { label: 'Use Normal Map' })
			}}
			let:values
			on:change={() => {
				ref.needsUpdate = true
			}}
		>
			{#if values.useMap}
				<Three type={map} attach="map" />
			{/if}
			{#if values.useNormalMap}
				<Three type={normalMap} attach="normalMap" />
			{/if}
		</Editable>

		<Editable name="Mesh / Material" color roughness metalness normalScale envMapIntensity />
	</T.MeshStandardMaterial>
</T.Mesh>

<T.Mesh rotation.x={-90 * DEG2RAD} receiveShadow>
	<T.CircleGeometry args={[3, 32]} />
	<T.MeshStandardMaterial side={DoubleSide} />
</T.Mesh>

<T.DirectionalLight position={[3, 5, 1.2]} castShadow>
	<Editable name="Light" transform controls color intensity />
</T.DirectionalLight>
