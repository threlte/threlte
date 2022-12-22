<script lang="ts">
	import { T, OrbitControls } from '@threlte/core'
	import { MeshStandardMaterial, CircleGeometry, DoubleSide } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Character from './Character.svelte'
</script>

<T.PerspectiveCamera position={[-0.6, 1.7, 2.1]} near={0.1} far={100}>
	<OrbitControls
		maxPolarAngle={DEG2RAD * 80}
		enableRotate={false}
		enableZoom={false}
		target={{ y: 0.9 }}
	/>
</T.PerspectiveCamera>

<T.AmbientLight />
<T.DirectionalLight position={[10, 5, 5]} />

<Character />

<T.Mesh
	receiveShadow
	rotation.x={-90 * (Math.PI / 180)}
	geometry={new CircleGeometry(3, 72)}
	material={new MeshStandardMaterial({ side: DoubleSide, color: 'white' })}
/>
