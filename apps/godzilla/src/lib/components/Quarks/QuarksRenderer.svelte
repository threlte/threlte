<script lang="ts">
	import { T, useFrame, useThrelte } from '@threlte/core'
	import { Portal } from '@threlte/extras'
	import { useQuarks } from './useQuarks'

	const { renderer, systems } = useQuarks(true)
	const { scene } = useThrelte()

	useFrame(
		({ invalidate }, delta) => {
			if (!systems.size) return
			renderer.update(delta)
			invalidate()
		},
		{ invalidate: false }
	)
</script>

<Portal object={scene}>
	<T is={renderer} />
</Portal>
