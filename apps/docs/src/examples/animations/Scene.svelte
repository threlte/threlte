<script lang="ts">
	import * as THREE from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { AmbientLight, DirectionalLight, Mesh, PerspectiveCamera, OrbitControls } from '@threlte/core'
	import { GLTF, useGltfAnimations } from "@threlte/extras";

	const { gltf, actions, mixer } = useGltfAnimations<'All Animations'>(({ actions, mixer }) => {
    // Either play your animations as soon as they are loaded
    // actions['All Animations']?.play()
  })

	// Or play them whenever you need
  export const triggerAnimation = () => {
    $actions['All Animations']?.play()
  }

	function handleKeyDown(event:KeyboardEvent) {
		console.log(event);
	}
</script>

<svelte:window on:keydown={handleKeyDown}/>

<PerspectiveCamera position={{ x:3, y:3, z: 5}} >
	<OrbitControls maxPolarAngle={DEG2RAD * 80}/>
</PerspectiveCamera>


<GLTF
	castShadow
	receiveShadow
	url="https://threejs.org/examples/models/gltf/Xbot.glb"
	bind:gltf={$gltf}
/>

<Mesh
	receiveShadow
	material={new THREE.MeshStandardMaterial()}
	geometry={new THREE.CircleBufferGeometry(4, 60)}
	rotation={{ x: DEG2RAD * -90 }}
/>

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<AmbientLight intensity={0.6} />
