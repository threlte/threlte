<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Mesh, useFrame, type Position } from '@threlte/core'
	import { AutoColliders, BasicPlayerController, RigidBody } from '@threlte/rapier'
	import {
		CapsuleBufferGeometry,
		Mesh as ThreeMesh,
		MeshStandardMaterial,
		SphereBufferGeometry,
		Vector3
	} from 'three'

	export let position: Position | undefined = undefined

	export let playerMesh: ThreeMesh
	let ballMesh: ThreeMesh

	let rigidBody: RapierRigidBody

	const playerPos = new Vector3()
	const ballPos = new Vector3()
	const maxF = 0.05
	const min = new Vector3(-maxF, 0, -maxF)
	const max = new Vector3(maxF, 0, maxF)

	useFrame(() => {
		if (!playerMesh || !ballMesh || !rigidBody) return

		playerMesh.getWorldPosition(playerPos)
		ballMesh.getWorldPosition(ballPos)

		const diff = playerPos.sub(ballPos).divideScalar(2000)
		diff.y = 0

		const f = diff.clamp(min, max)

		rigidBody.applyImpulse(f, true)
	})
</script>

<!-- To detect the groundedness of the player, a collider on group 15 is used -->
<BasicPlayerController
	{position}
	speed={3}
	radius={0.3}
	height={1.8}
	jumpStrength={2}
	groundCollisionGroups={[15]}
	playerCollisionGroups={[0]}
>
	<Mesh
		bind:mesh={playerMesh}
		position={{ y: 0.9 }}
		receiveShadow
		castShadow
		geometry={new CapsuleBufferGeometry(0.3, 1.8 - 0.3 * 2)}
		material={new MeshStandardMaterial()}
	/>
</BasicPlayerController>

<RigidBody bind:rigidBody position={{ y: 1, z: -5 }}>
	<AutoColliders shape={'ball'}>
		<Mesh
			bind:mesh={ballMesh}
			receiveShadow
			castShadow
			geometry={new SphereBufferGeometry(0.25)}
			material={new MeshStandardMaterial()}
		>
			<slot />
		</Mesh>
	</AutoColliders>
</RigidBody>
