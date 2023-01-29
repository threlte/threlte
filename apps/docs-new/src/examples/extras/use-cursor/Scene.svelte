<script lang="ts">
	import { InteractiveObject, T, useThrelte } from '@threlte/core'
	import { Text, useCursor } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	const { hovering, onPointerEnter, onPointerLeave } = useCursor()

	$: color = $hovering ? '#dddddd' : '#c62004'

	const { size } = useThrelte()

	let zoom = $size.width / 7
	$: zoom = $size.width / 7
</script>

<T.OrthographicCamera
	{zoom}
	position={[5, 5, 5]}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0)
	}}
	makeDefault
/>

<T.DirectionalLight position.y={10} position.x={5} />
<T.AmbientLight intensity={0.2} />

<Text
	text="HOVER"
	interactive
	on:pointerenter={onPointerEnter}
	on:pointerleave={onPointerLeave}
	fontSize={0.5}
	anchorY="100%"
	anchorX="50%"
	rotation.y={90 * DEG2RAD}
	position.y={1}
	position.x={-1}
	{color}
/>

<T.Mesh let:ref>
	<InteractiveObject
		object={ref}
		interactive
		on:pointerenter={onPointerEnter}
		on:pointerleave={onPointerLeave}
	/>
	<T.MeshStandardMaterial {color} />
	<T.BoxGeometry args={[2, 2, 2]} />
</T.Mesh>
