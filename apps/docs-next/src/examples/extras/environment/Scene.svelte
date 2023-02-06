<script lang="ts">
	import { OrbitControls, T } from '@threlte/core'
</script>

<T.PerspectiveCamera position={[10, 7, 10]} fov={60} near={1} far={20000} makeDefault>
	<OrbitControls autoRotate={true} enableZoom={true} target={{ x: 0, y: 0, z: 0 }} />
</T.PerspectiveCamera>

<T.Mesh castShadow receiveShadow position.y={2.5}>
	<T.SphereGeometry args={[2.5]} />
	<T.MeshStandardMaterial color="white" metalness={0.9} roughness={0.05} envMapIntensity={0.5} />
</T.Mesh>
