<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { T, useThrelte } from '@threlte/core'
	import { Portal, useGltf } from '@threlte/extras'
	import { AutoColliders, Collider, Debug, RigidBody } from '@threlte/rapier'
	import { createEventDispatcher, onMount } from 'svelte'
	import { Group, Matrix4, Quaternion, Vector3 } from 'three'
	import Arrow from '../models/Arrow.svelte'

	let rigidBody: RapierRigidBody
	export let origin: Vector3
	export let quaternion: Quaternion

	const group = new Group()

	group.position.copy(origin)
	group.quaternion.copy(quaternion)

	$: if (rigidBody) {
		const forward = new Vector3(0, 0, -1)
		const impulse = forward.applyQuaternion(quaternion).normalize().multiplyScalar(0.01)
		rigidBody.applyImpulse(impulse, true)
	}

	const dispatch = createEventDispatcher<{
		eol: void
	}>()

	onMount(() => {
		const timeout = setTimeout(() => {
			dispatch('eol')
		}, 10e3)
		return () => clearTimeout(timeout)
	})

	const { scene } = useThrelte()
	type GLTFResult = {
		nodes: {
			Arrow: THREE.Mesh
		}
		materials: {
			Arrow: THREE.MeshStandardMaterial
		}
	}

	const gltf = useGltf<GLTFResult>('/models/Arrow.glb')

	let type: 'dynamic' | 'fixed' = 'dynamic'
</script>

{#if $gltf}
	<Portal object={scene}>
		<T is={group}>
			<RigidBody
				bind:rigidBody
				{type}
				canSleep={type === 'fixed'}
				ccd={type === 'dynamic'}
				on:collisionenter={() => (type = 'fixed')}
			>
				<AutoColliders shape="cuboid">
					<T.Mesh geometry={$gltf.nodes.Arrow.geometry} material={$gltf.materials.Arrow} />
				</AutoColliders>
			</RigidBody>
		</T>
	</Portal>
{/if}
