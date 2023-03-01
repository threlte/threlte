<script lang="ts">
	import { T, Three } from '@threlte/core'
	import { Environment, HTML, useGltf } from '@threlte/extras'
	import { AutoColliders, RigidBody } from '@threlte/rapier'
	import { BoxGeometry, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Car from './Car.svelte'
	import Ground from './Ground.svelte'

	const gltf = useGltf('/models/loop/loop.glb')
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<T.DirectionalLight position={[8, 20, -3]} />

<Ground />

<RigidBody dominance={1} position={[-10, 3, -12]}>
	<HTML transform sprite pointerEvents={'none'} position={{ y: 1 }}>
		<p>Dominance: 1</p>
	</HTML>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh geometry={new BoxGeometry(1, 1, 1)} material={new MeshStandardMaterial()} />
	</AutoColliders>
</RigidBody>

<RigidBody dominance={-1} position={[-15, 3, -14]}>
	<HTML transform sprite pointerEvents={'none'} position={{ y: 3 }}>
		<p>Dominance: -1</p>
	</HTML>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh geometry={new BoxGeometry(3, 3, 3)} material={new MeshStandardMaterial()} />
	</AutoColliders>
</RigidBody>

<RigidBody dominance={0} position={[-13, 3, -10]}>
	<HTML transform sprite pointerEvents={'none'} position={{ y: 2 }}>
		<p>Dominance: 0</p>
	</HTML>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh geometry={new BoxGeometry(2, 2, 2)} material={new MeshStandardMaterial()} />
	</AutoColliders>
</RigidBody>

{#if $gltf}
	<AutoColliders shape={'trimesh'}>
		<Three type={$gltf.scene} rotation.y={90 * DEG2RAD} position={[-50, -0.3, -3]} />
	</AutoColliders>
{/if}

<Car position.x={70} position.y={5}>
	<T.PerspectiveCamera
		rotation={[-90 * DEG2RAD, 70 * DEG2RAD, 90 * DEG2RAD]}
		position.x={10}
		position.y={5}
		fov={60}
		makeDefault
	/>
</Car>
