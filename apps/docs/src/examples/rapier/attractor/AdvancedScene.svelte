<script lang="ts" context="module">
	const geometry = new SphereBufferGeometry(1)
	const material = new MeshBasicMaterial({ color: 'red' })
</script>

<script lang="ts">
	import {
		DirectionalLight,
		Object3DInstance,
		OrbitControls,
		PerspectiveCamera,
		Mesh
	} from '@threlte/core'
	import { Debug, Attractor, RigidBody, Collider } from '@threlte/rapier'
	import type { GravityType } from '@threlte/rapier/src/lib/types/components'
	import { GridHelper, SphereBufferGeometry, MeshBasicMaterial } from 'three'

	export let showHelper: boolean
	export let type: GravityType = 'static'
	let hide = false
	export const reset = () => {
		hide = true
		setTimeout(() => (hide = false))
	}

	const config: any = {
		static: {
			type: 'static',
			strength: 3,
			range: 100,
			gravitationalConstant: undefined
		},
		linear: {
			type: 'linear',
			strength: 1,
			range: 100,
			gravitationalConstant: undefined
		},
		newtonian: {
			type: 'newtonian',
			strength: 10,
			range: 100,
			gravitationalConstant: 10
		}
	}
</script>

<PerspectiveCamera position={{ y: 50, z: 100 }} fov={70} far={10000}>
	<OrbitControls enableZoom={true} target={{ y: 20 }} />
</PerspectiveCamera>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<Object3DInstance object={new GridHelper(100)} />

<Debug />

{#if !hide}
	<RigidBody position={{ x: -50 }} linearVelocity={{ x: 5, z: -5 }}>
		<Collider shape="ball" args={[1]} mass={config[type].strength} />
		<Mesh {geometry} {material} />
		<Attractor
			range={config[type].range}
			gravitationalConstant={config[type].gravitationalConstant}
			strength={config[type].strength}
			gravityType={type}
			{showHelper}
		/>
	</RigidBody>
	<RigidBody linearVelocity={{ y: 5 }}>
		<Collider shape="ball" args={[1]} mass={config[type].strength} />
		<Mesh {geometry} {material} />
		<Attractor
			range={config[type].range}
			gravitationalConstant={config[type].gravitationalConstant}
			strength={config[type].strength}
			gravityType={type}
			{showHelper}
		/>
	</RigidBody>
	<RigidBody position={{ x: 50 }} linearVelocity={{ x: -5, z: 5 }}>
		<Collider shape="ball" args={[1]} mass={config[type].strength} />
		<Mesh {geometry} {material} />
		<Attractor
			range={config[type].range}
			gravitationalConstant={config[type].gravitationalConstant}
			strength={config[type].strength}
			gravityType={type}
			{showHelper}
		/>
	</RigidBody>
{/if}
