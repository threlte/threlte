<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Mesh, useFrame, useThrelte, useThrelteRoot } from '@threlte/core'
	import { RigidBody } from '@threlte/rapier'
	import { CircleBufferGeometry } from 'three'
	import { MeshBasicMaterial } from 'three'
	import { Vector3, Mesh as ThreeMesh } from 'three'
	import { MeshStandardMaterial, SphereBufferGeometry } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	let rigidBody: RapierRigidBody

	export let playerMesh: ThreeMesh | undefined = undefined

	const { pointer, camera, scene, pointerOverCanvas } = useThrelte()
	const { raycaster } = useThrelteRoot()

	const t3 = new Vector3()
	const maxF = 0.05
	const min = new Vector3(-maxF, 0, -maxF)
	const max = new Vector3(maxF, 0, maxF)

	$: if (rigidBody) {
		rigidBody.setLinearDamping(2)
		rigidBody.setAngularDamping(2)
	}

	const target = new Vector3()

	useFrame(() => {
		if (!$pointerOverCanvas || !rigidBody) return
		raycaster.setFromCamera($pointer, $camera)
		raycaster.layers.disableAll()
		raycaster.layers.enable(2)
		const intersections = raycaster.intersectObject(scene, true)

		if (intersections.length) {
			const intersection = intersections[0]

			const rbTranslation = rigidBody.translation()
			// The ground is on y = 0, we'll assume the sphere to be too
			t3.set(rbTranslation.x, 0, rbTranslation.z)

			const point = intersection.point
			point.y = 0

			target.copy(point)
			target.y = 0.01

			const diff = point.sub(t3).divideScalar(1000)
			const f = diff.clamp(min, max)

			rigidBody.applyImpulse(f, true)
		}

		raycaster.layers.enableAll()
	})
</script>

<RigidBody bind:rigidBody colliders={'ball'} position={{ y: 1, z: -2 }}>
	<Mesh
		receiveShadow
		castShadow
		bind:mesh={playerMesh}
		geometry={new SphereBufferGeometry(0.25)}
		material={new MeshStandardMaterial()}
	>
		<slot />
	</Mesh>
</RigidBody>

<Mesh
	rotation={{ x: -90 * DEG2RAD }}
	position={target}
	geometry={new CircleBufferGeometry(0.15, 20)}
	material={new MeshBasicMaterial({
		color: 0x0000ff
	})}
>
	<slot />
</Mesh>
