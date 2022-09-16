<script lang="ts" context="module">
	const geometry = new SphereBufferGeometry(1)
	const material = new MeshBasicMaterial({ color: 'red' })
</script>

<script lang="ts">
	import { SphereBufferGeometry, MeshBasicMaterial } from 'three'
	import { Mesh } from '@threlte/core'
	import { RigidBody, Collider } from '@threlte/rapier'
	import { Vector3 } from 'three'

	export let count: number = 20
	export let rangeX: [number, number] = [-20, 20]
	export let rangeY: [number, number] = [-20, 20]
	export let rangeZ: [number, number] = [-20, 20]

	const getId = () => {
		return Math.random().toString(16).slice(2)
	}

	const randomNumber = (min: number, max: number): number => {
		return Math.random() * (max - min) + min
	}

	const getRandomPosition = () => {
		return new Vector3(
			randomNumber(rangeX[0], rangeX[1]),
			randomNumber(rangeY[0], rangeY[1]),
			randomNumber(rangeZ[0], rangeZ[1])
		)
	}

	const generateBodies = (c: number) => {
		return Array(c)
			.fill('x')
			.map((_) => {
				return {
					id: getId(),
					position: getRandomPosition()
				}
			})
	}

	$: bodies = generateBodies(count)
</script>

{#each bodies as body (body.id)}
	<RigidBody position={body.position}>
		<Collider shape="ball" args={[0.75]} mass={Math.random() * 10} />
		<Mesh {geometry} {material} />
	</RigidBody>
{/each}
