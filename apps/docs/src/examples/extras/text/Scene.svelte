<script lang="ts">
	import { T, TransformableObject, useFrame } from '@threlte/core'
	import { Grid, Text } from '@threlte/extras'

	let rotation = 0

	export let text: string
	export let fontSize: number

	useFrame(() => {
		rotation += 0.002
	})
</script>

<T.Group rotation.y={rotation}>
	<T.OrthographicCamera zoom={80} let:ref={cam} position={[0, 5, 10]} makeDefault>
		<TransformableObject object={cam} lookAt={{}} />
	</T.OrthographicCamera>
</T.Group>

<Text {text} color="black" {fontSize} anchorX="50%" anchorY="100%" />

<Grid sectionColor="#FF3E00" />
