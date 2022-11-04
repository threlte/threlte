<script lang="ts" context="module">
	import { Three2 } from '@threlte/core'
	import { Edges } from '@threlte/extras'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { createEventDispatcher } from 'svelte'
	import { cubicIn } from 'svelte/easing'
	import { tweened } from 'svelte/motion'
	import type { Writable } from 'svelte/store'
	import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from 'three'
	import type { BlockColors } from './blockColors'

	export type BlockData = {
		position: {
			x: number
			z: number
		}
		hit: Writable<boolean>
		size: number
		freeze: Writable<boolean>
		blockColors: BlockColors
	}
</script>

<script lang="ts">
	export let position: BlockData['position']
	export let size: BlockData['size']
	export let blockColors: BlockData['blockColors']
	export let hit: BlockData['hit']
	export let freeze: BlockData['freeze']

	const dispatch = createEventDispatcher<{
		hit: void
	}>()

	const { innerColor, outerColor } = blockColors

	const scale = tweened(0)
	scale.set(1, {
		easing: cubicIn
	})
</script>

<Three2 type={Group} position.x={position.x} position.z={position.z}>
	<RigidBody
		type={!$hit || $freeze ? 'fixed' : 'dynamic'}
		canSleep={false}
		dominance={$hit ? -1 : 1}
		enabledTranslations={[true, false, true]}
	>
		<Collider
			shape="cuboid"
			args={[size / 2, 1 / 2, size / 2]}
			on:collisionexit={() => dispatch('hit')}
			mass={1}
		>
			<Three2 type={Mesh} scale={$scale} let:ref={mesh}>
				<Three2 type={BoxGeometry} args={[size, 1, size]} />
				<Three2 type={MeshStandardMaterial} color={$innerColor} transparent opacity={0.5} />
				<Edges color={$outerColor} scale={1.01} />
			</Three2>
		</Collider>
	</RigidBody>
</Three2>
