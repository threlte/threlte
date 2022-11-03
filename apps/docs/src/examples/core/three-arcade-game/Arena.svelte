<script lang="ts">
	import { Three2 } from '@threlte/core'
	import { AutoColliders, Collider, RigidBody } from '@threlte/rapier'
	import { createEventDispatcher } from 'svelte'
	import { MeshStandardMaterial } from 'three'
	import { BoxGeometry } from 'three'
	import { Mesh } from 'three'
	import {
		arenaBorderWidth,
		arenaDepth,
		arenaHeight,
		arenaWidth,
		playerToBorderDistance
	} from './config'
</script>

<AutoColliders shape="cuboid">
	<Three2 type={Mesh} position.x={(arenaWidth / 2) * -1}>
		<Three2
			type={BoxGeometry}
			args={[arenaBorderWidth, arenaDepth, arenaHeight + arenaBorderWidth]}
		/>
		<Three2 type={MeshStandardMaterial} transparent opacity={0.7} color="red" />
	</Three2>

	<Three2 type={Mesh} position.x={arenaWidth / 2}>
		<Three2
			type={BoxGeometry}
			args={[arenaBorderWidth, arenaDepth, arenaHeight + arenaBorderWidth]}
		/>
		<Three2 type={MeshStandardMaterial} transparent opacity={0.7} color="red" />
	</Three2>

	<Three2 type={Mesh} position.z={arenaHeight / 2}>
		<Three2
			type={BoxGeometry}
			args={[arenaWidth + arenaBorderWidth, arenaDepth, arenaBorderWidth]}
		/>
		<Three2 type={MeshStandardMaterial} transparent opacity={0.7} color="red" />
	</Three2>

	<Three2 type={Mesh} position.z={(arenaHeight / 2) * -1}>
		<Three2
			type={BoxGeometry}
			args={[arenaWidth + arenaBorderWidth, arenaDepth, arenaBorderWidth]}
		/>
		<Three2 type={MeshStandardMaterial} transparent opacity={0.7} color="red" />
	</Three2>
</AutoColliders>

<Collider
	sensor
	shape="cuboid"
	position={{ z: arenaHeight / 2 - arenaBorderWidth / 2 - playerToBorderDistance / 2 }}
	args={[arenaWidth / 2 - arenaBorderWidth / 2, arenaDepth / 2, playerToBorderDistance / 2]}
/>
