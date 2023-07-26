<script lang="ts">
	import { T, useFrame, useThrelte } from '@threlte/core'
	import { Portal } from '@threlte/extras'
	import { SheetObject } from '@threlte/theatre'
	import type { DirectionalLightHelper } from 'three'
	import { debug } from './state'

	export let key: string

	const { scene } = useThrelte()

	let helper: DirectionalLightHelper | undefined
	useFrame(() => {
		helper?.update()
	})
</script>

<SheetObject {key} let:Transform let:Sync>
	<Transform>
		<T.DirectionalLight let:ref={light} position={[0, 0, 0]}>
			<Sync intensity color />
			{#if $debug}
				<Portal object={scene}>
					<T.DirectionalLightHelper args={[light]} bind:ref={helper} />
				</Portal>
			{/if}
		</T.DirectionalLight>
	</Transform>
</SheetObject>
