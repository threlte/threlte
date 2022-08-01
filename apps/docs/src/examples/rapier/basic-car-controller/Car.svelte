<script lang="ts" context="module">
	import { writable, type Writable } from 'svelte/store'
	type CarContext = {
		speed: Writable<number>
	}

	export const useCar = () => {
		return getContext<CarContext>('threlte-car-context')
	}
</script>

<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Group, Mesh, useFrame, type Position, type Rotation } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { Collider, RigidBody, useRapier } from '@threlte/rapier'
	import { getContext, setContext } from 'svelte'
	import { BoxBufferGeometry, MeshStandardMaterial, Vector3 } from 'three'
	import Axle from './Axle.svelte'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	export let position: Position | undefined = undefined
	export let rotation: Rotation | undefined = undefined

	let parentRigidBody: RapierRigidBody

	const carContext = {
		speed: writable(0)
	}

	const { speed } = carContext

	setContext<typeof carContext>('threlte-car-context', carContext)

	const { world } = useRapier()
	const v3 = new Vector3()

	useFrame(() => {
		const s = parentRigidBody.linvel()
		v3.set(s.x, s.y, s.z)
		carContext.speed.set(v3.length())
	})

	world.maxStabilizationIterations *= 100
	world.maxVelocityFrictionIterations *= 100
	world.maxVelocityIterations *= 100
</script>

<Group {position} {rotation}>
	<RigidBody bind:rigidBody={parentRigidBody} canSleep={false}>
		<Collider mass={2} shape={'cuboid'} args={[1.25, 0.15, 0.5]} />
		<Mesh
			castShadow
			geometry={new BoxBufferGeometry(2.5, 0.3, 1)}
			material={new MeshStandardMaterial()}
		/>

		<slot />
		<HTML rotation={{ y: 90 * DEG2RAD }} transform position={{ y: 1 }}>
			{($speed * 3.6).toFixed(0)} km/h
		</HTML>
	</RigidBody>

	<Axle
		side={'left'}
		isSteered
		{parentRigidBody}
		position={{ x: -1.2, z: 0.8, y: -0.1 }}
		anchor={{ x: -1.2, z: 0.8, y: -0.1 }}
	/>
	<Axle
		side={'right'}
		isSteered
		{parentRigidBody}
		position={{ x: -1.2, z: -0.8, y: -0.1 }}
		anchor={{ x: -1.2, z: -0.8, y: -0.1 }}
	/>

	<Axle
		isDriven
		side={'left'}
		{parentRigidBody}
		position={{ x: 1.2, z: 0.8 }}
		anchor={{ x: 1.2, z: 0.8 }}
	/>
	<Axle
		isDriven
		side={'right'}
		{parentRigidBody}
		position={{ x: 1.2, z: -0.8 }}
		anchor={{ x: 1.2, z: -0.8 }}
	/>
</Group>
