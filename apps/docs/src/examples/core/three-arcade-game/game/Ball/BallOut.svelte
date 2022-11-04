<script>
	import { Three2 } from '@threlte/core'
	import { MeshBasicMaterial } from 'three'
	import { BoxGeometry } from 'three'
	import { Mesh } from 'three'
	import { Group } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { gameState } from '../state'

	const { ballPosition } = gameState

	const geometry = new BoxGeometry(1, 0.1, 0.1)
	const material = new MeshBasicMaterial({
		color: 'red'
	})
</script>

<Three2
	type={Group}
	position.z={$ballPosition.z}
	position.x={$ballPosition.x}
	rotation.y={DEG2RAD * 45}
>
	<Three2 type={Mesh}>
		<Three2 type={geometry} />
		<Three2 type={material} />
	</Three2>

	<Three2 type={Mesh} rotation.y={DEG2RAD * 90}>
		<Three2 type={geometry} />
		<Three2 type={material} />
	</Three2>
</Three2>
