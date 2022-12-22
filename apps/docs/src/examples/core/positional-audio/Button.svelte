<script lang="ts">
	import { InteractiveObject, T } from '@threlte/core'
	import { Edges, Text, useCursor } from '@threlte/extras'
	import { spring } from 'svelte/motion'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	export let text: string

	const buttonOffsetY = spring(0)

	let buttonColor = '#111111'
	let textColor = '#eedbcb'

	const { onPointerEnter, onPointerLeave } = useCursor()
</script>

<T.Group {...$$restProps}>
	<T.Group position.y={0.05 - $buttonOffsetY}>
		<T.Mesh let:ref>
			<InteractiveObject
				object={ref}
				interactive
				on:click
				on:pointerenter={(e) => {
					buttonColor = '#eedbcb'
					textColor = '#111111'
					onPointerEnter()
				}}
				on:pointerleave={(e) => {
					buttonColor = '#111111'
					textColor = '#eedbcb'
					buttonOffsetY.set(0)
					onPointerLeave()
				}}
				on:pointerdown={() => {
					buttonOffsetY.set(0.05)
				}}
				on:pointerup={() => {
					buttonOffsetY.set(0)
				}}
			/>

			<T.BoxGeometry args={[1.2, 0.1, 0.8]} />
			<T.MeshStandardMaterial color={buttonColor} />

			<Edges color="black" ignorePointer />
		</T.Mesh>
		<Text
			renderOrder={-100}
			ignorePointer
			color={textColor}
			{text}
			rotation.x={DEG2RAD * -90}
			position.y={0.055}
			fontSize={0.35}
			anchorX="50%"
			anchorY="50%"
		/>
	</T.Group>
</T.Group>
