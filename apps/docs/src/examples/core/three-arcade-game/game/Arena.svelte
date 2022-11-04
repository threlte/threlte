<script lang="ts">
	import { Three2 } from '@threlte/core'
	import { AutoColliders, Collider } from '@threlte/rapier'
	import { LineBasicMaterial } from 'three'
	import { GridHelper } from 'three'
	import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three'
	import {
		arenaBorderWidth,
		arenaDepth,
		arenaHeight,
		arenaWidth,
		playerToBorderDistance
	} from './config'
	import { gameState } from './state'

	const { baseColor } = gameState
</script>

<Three2 type={GridHelper} args={[arenaWidth, 8]} position.y={-0.5}>
	<Three2 type={LineBasicMaterial} color={$baseColor} transparent opacity={0.1} />
</Three2>

<AutoColliders shape="cuboid">
	<Three2 type={Mesh} position.x={(arenaWidth / 2) * -1}>
		<Three2
			type={BoxGeometry}
			args={[arenaBorderWidth, arenaDepth, arenaHeight + arenaBorderWidth]}
		/>
		<Three2 type={MeshStandardMaterial} transparent opacity={0.7} color={$baseColor} />
	</Three2>

	<Three2 type={Mesh} position.x={arenaWidth / 2}>
		<Three2
			type={BoxGeometry}
			args={[arenaBorderWidth, arenaDepth, arenaHeight + arenaBorderWidth]}
		/>
		<Three2 type={MeshStandardMaterial} transparent opacity={0.7} color={$baseColor} />
	</Three2>

	<Three2 type={Mesh} position.z={arenaHeight / 2}>
		<Three2
			type={BoxGeometry}
			args={[arenaWidth + arenaBorderWidth, arenaDepth, arenaBorderWidth]}
		/>
		<Three2 type={MeshStandardMaterial} transparent opacity={0.7} color={$baseColor} />
	</Three2>

	<Three2 type={Mesh} position.z={(arenaHeight / 2) * -1}>
		<Three2
			type={BoxGeometry}
			args={[arenaWidth + arenaBorderWidth, arenaDepth, arenaBorderWidth]}
		/>
		<Three2 type={MeshStandardMaterial} transparent opacity={0.7} color={$baseColor} />
	</Three2>
</AutoColliders>

<Collider
	sensor
	shape="cuboid"
	position={{ z: arenaHeight / 2 - arenaBorderWidth / 2 - playerToBorderDistance / 2 }}
	args={[arenaWidth / 2 - arenaBorderWidth / 2, arenaDepth / 2, playerToBorderDistance / 2]}
/>
