<script lang="ts">
	import { Three2 } from '@threlte/core'
	import { Edges } from '@threlte/extras'
	import { AutoColliders, Collider, RigidBody } from '@threlte/rapier'
	import { createEventDispatcher } from 'svelte'
	import { spring } from 'svelte/motion'
	import { Group } from 'three'
	import { MeshStandardMaterial } from 'three'
	import { BoxGeometry } from 'three'
	import { Mesh } from 'three'

	export let position: { x: number; z: number }
	export let size: number
	export let hit: boolean
	export let index: number

	const dispatch = createEventDispatcher<{
		hit: void
	}>()

	const scale = spring(0)
	setTimeout(() => {
		scale.set(1)
	}, index * 100)
</script>

<Three2 type={Group} position.x={position.x} position.z={position.z}>
	<RigidBody
		type={hit ? 'dynamic' : 'fixed'}
		canSleep={false}
		dominance={hit ? -1 : 1}
		enabledTranslations={[true, false, true]}
	>
		<Collider
			shape="cuboid"
			args={[size / 2, 1 / 2, size / 2]}
			on:collisionexit={() => dispatch('hit')}
			mass={1}
		>
			<Three2 type={Mesh} scale={$scale}>
				<Three2 type={BoxGeometry} args={[size, 1, size]} />
				<Three2
					type={MeshStandardMaterial}
					color={hit ? 'yellow' : 'red'}
					transparent
					opacity={0.5}
				/>
				<Edges color="red" scale={1.01} />
			</Three2>
		</Collider>
	</RigidBody>
</Three2>
