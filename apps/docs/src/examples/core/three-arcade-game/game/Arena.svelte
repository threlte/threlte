<script lang="ts">
	import { Three2 } from '@threlte/core'
	import { Collider } from '@threlte/rapier'
	import { LineBasicMaterial, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { arenaDepth, arenaHeight, arenaWidth } from './config'
	import { CustomGridHelper } from './CustomGridHelper.js'
	import { useArenaCollisionEnterEvent } from './hooks/useArenaCollider'

	const colliderWidth = 10

	const sideGridOpacity = 0.7

	const { onCollision: onTopCollision, opacity: topOpacity } = useArenaCollisionEnterEvent()
	const { onCollision: onLeftCollision, opacity: leftOpacity } = useArenaCollisionEnterEvent()
	const { onCollision: onRightCollision, opacity: rightOpacity } = useArenaCollisionEnterEvent()
</script>

<!-- BACKGROUND GRID -->
<Three2
	type={CustomGridHelper}
	args={[arenaWidth, arenaWidth, arenaHeight, arenaWidth]}
	position.y={-0.5}
>
	<Three2 type={LineBasicMaterial} color="green" transparent opacity={0.1} />
</Three2>

<!-- LEFT GRID -->
<Three2
	type={CustomGridHelper}
	args={[arenaDepth, arenaDepth, arenaHeight, arenaHeight]}
	rotation.z={90 * DEG2RAD}
	position.x={(arenaWidth / 2) * -1}
>
	<Three2 type={LineBasicMaterial} color="green" transparent opacity={sideGridOpacity} />

	<Three2 type={Mesh} rotation.x={90 * DEG2RAD}>
		<Three2 type={PlaneGeometry} args={[arenaDepth, arenaHeight]} />
		<Three2 type={MeshBasicMaterial} color="green" transparent opacity={$leftOpacity} />
	</Three2>
</Three2>

<!-- RIGHT GRID -->
<Three2
	type={CustomGridHelper}
	args={[arenaDepth, arenaDepth, arenaHeight, arenaHeight]}
	rotation.z={90 * DEG2RAD}
	position.x={arenaWidth / 2}
>
	<Three2 type={LineBasicMaterial} color="green" transparent opacity={sideGridOpacity} />

	<Three2 type={Mesh} rotation.x={-90 * DEG2RAD}>
		<Three2 type={PlaneGeometry} args={[arenaDepth, arenaHeight]} />
		<Three2 type={MeshBasicMaterial} color="green" transparent opacity={$rightOpacity} />
	</Three2>
</Three2>

<!-- TOP GRID -->
<Three2
	type={CustomGridHelper}
	args={[arenaDepth, arenaDepth, arenaHeight, arenaHeight]}
	rotation.y={90 * DEG2RAD}
	rotation.x={90 * DEG2RAD}
	position.z={(arenaHeight / 2) * -1}
>
	<Three2 type={LineBasicMaterial} color="green" transparent opacity={sideGridOpacity} />

	<Three2 type={Mesh} rotation.x={-90 * DEG2RAD}>
		<Three2 type={PlaneGeometry} args={[arenaDepth, arenaHeight]} />
		<Three2 type={MeshBasicMaterial} color="green" transparent opacity={$topOpacity} />
	</Three2>
</Three2>

<!-- LEFT COLLIDER -->
<Collider
	on:collisionenter={onLeftCollision}
	position={{ x: (colliderWidth / 2 + arenaWidth / 2) * -1 }}
	shape="cuboid"
	args={[colliderWidth / 2, 1 / 2, arenaHeight / 2]}
/>

<!-- RIGHT COLLIDER -->
<Collider
	on:collisionenter={onRightCollision}
	position={{ x: colliderWidth / 2 + arenaWidth / 2 }}
	shape="cuboid"
	args={[colliderWidth / 2, 1 / 2, arenaHeight / 2]}
/>

<!-- TOP COLLIDER -->
<Collider
	on:collisionenter={onTopCollision}
	position={{ z: (colliderWidth / 2 + arenaHeight / 2) * -1 }}
	shape="cuboid"
	args={[(colliderWidth * 2 + arenaWidth) / 2, 1 / 2, colliderWidth / 2]}
/>

<!-- BOTTOM COLLIDER (acts as the game over zone sensor) -->
<Collider
	sensor
	position={{ z: colliderWidth / 2 + arenaHeight / 2 }}
	shape="cuboid"
	args={[(colliderWidth * 2 + arenaWidth) / 2, 1 / 2, colliderWidth / 2]}
/>
