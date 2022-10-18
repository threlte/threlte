<script lang="ts">
	import { Group, Mesh, OrbitControls, PerspectiveCamera } from '@threlte/core';
	import { MeshStandardMaterial, SphereGeometry } from 'three';

</script>

<PerspectiveCamera position={{ x: 10, y: 7, z: 10 }} fov={60} near={1} far={20000}>
	<OrbitControls autoRotate={true} enableZoom={true} target={{ x: 0, y: 0, z: 0 }} />
</PerspectiveCamera>

<Mesh
			geometry={new SphereGeometry(2.5)}
			material={new MeshStandardMaterial({
				color: 0xffffff,
				metalness: 0.9,
				roughness: 0.05,
				envMapIntensity: 0.5
			})}
			castShadow
			receiveShadow
			position={{y:2.5}}/>
