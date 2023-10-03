<script lang="ts">
	import { T, useFrame, useParent } from '@threlte/core'
	import { PositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper'

	const parent = useParent()

	const helper = new PositionalAudioHelper($parent as any)

	useFrame(
		() => {
			helper.update()
		},
		{
			invalidate: false
		}
	)
</script>

<T is={helper} />
