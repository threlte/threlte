<script lang="ts">
	import type { Collider as RapierCollider } from '@dimforge/rapier3d-compat'
	import * as theatreCore from '@theatre/core'
	import { T, type Position, type Rotation } from '@threlte/core'
	import { InstancedMesh, useTexture } from '@threlte/extras'
	import { Attractor, Collider } from '@threlte/rapier'
	import { Editable } from '@threlte/theatre'
	import { MeshStandardMaterial, SphereGeometry } from 'three'
	import ObjectAInstance from './ObjectAInstance.svelte'

	const { types } = theatreCore

	// matrix of 3 x 3 x 3
	const gap = 1
	const matrix: {
		position: Position
		rotation: Rotation
	}[] = []
	const matrixLength = 6
	const matrixSize = matrixLength - 1 + (matrixLength - 1) * gap
	for (let x = 0; x < matrixLength; x++) {
		for (let y = 0; y < matrixLength; y++) {
			for (let z = 0; z < matrixLength; z++) {
				matrix.push({
					position: {
						x: x + x * gap - matrixSize / 2,
						y: y + y * gap - matrixSize / 2,
						z: z + z * gap - matrixSize / 2
					},
					rotation: {
						x: Math.random() * Math.PI * 2,
						y: Math.random() * Math.PI * 2,
						z: Math.random() * Math.PI * 2
					}
				})
			}
		}
	}

	let coneCollider: RapierCollider | undefined = undefined

	const maps = useTexture({
		map: '/assets/theatre/main/textures/ball_texture.jpg',
		normalMap: '/assets/theatre/main/textures/ball_normal_map.jpg'
	})
</script>

<Editable
	name="ObjectA / Main"
	props={{
		attractor: {
			strength: types.number(0, { range: [-2, 2] }),
			range: 50
		},
		showObjectA: false,
		showColliderA: false
	}}
	let:values={{ attractor, showObjectA, showColliderA }}
>
	{#if showObjectA}
		<Attractor strength={attractor.strength} range={attractor.range}>
			<Editable name="ObjectA / Attractor / Transform" transform controls />
		</Attractor>
		{#await maps then value}
			<InstancedMesh
				geometry={new SphereGeometry(0.5)}
				material={new MeshStandardMaterial({
					color: 'white',
					...value
				})}
			>
				{#each matrix as matrixItem, index}
					<ObjectAInstance {coneCollider} instance={matrixItem} />
				{/each}
			</InstancedMesh>
		{/await}
	{/if}

	{#if showColliderA}
		<Collider shape="cone" args={[2.5, 3]} bind:collider={coneCollider}>
			<Editable name="ObjectA / Collider" transform controls />
			<T.Mesh>
				<T.ConeGeometry args={[3, 5, 36, 1]} />
				<T.MeshStandardMaterial color="white" />
			</T.Mesh>
		</Collider>
	{/if}
</Editable>
