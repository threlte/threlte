<script lang="ts">
	import { onDestroy } from 'svelte'
	import { BoxGeometry, GridHelper, MeshStandardMaterial } from 'three'
	import { T, OrbitControls, TransformControls, useThrelte } from '@threlte/core'

	const gridHelper = new GridHelper(10, 10)
	const { scene } = useThrelte()
	scene.add(gridHelper)
	onDestroy(() => {
		scene.remove(gridHelper)
	})
</script>

<T.PerspectiveCamera makeDefault position={[10, 5, 10]} lookAt={{ y: 0.5 }}>
	<OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight position.y={10} position.z={10} />

<T.Mesh position.y={1} geometry={new BoxGeometry(2, 2, 2)} material={new MeshStandardMaterial()}>
	<TransformControls translationSnap={1} showY={false} />
</T.Mesh>
