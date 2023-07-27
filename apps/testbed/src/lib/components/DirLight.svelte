<script lang="ts">
	import { T, useFrame, useThrelte } from '@threlte/core'
	import { Portal } from '@threlte/extras'
	import { SheetObject } from '@threlte/theatre'
	import type { DirectionalLightHelper } from 'three'
	import { debug } from './state'
	import { types } from '@theatre/core'

	export let key: string
	export let castShadow: boolean = false

	const { scene } = useThrelte()

	let helper: DirectionalLightHelper | undefined
	useFrame(() => {
		helper?.update()
	})
</script>

<SheetObject {key} let:Transform let:Sync>
	<Transform>
		<T.DirectionalLight
			let:ref={light}
			position={[0, 0, 0]}
			shadow.camera.left={-5}
			shadow.camera.bottom={-5}
			shadow.camera.right={5}
			shadow.camera.top={5}
			{castShadow}
		>
			<Sync
				intensity={{
					transformer: {
						transform(value) {
							return types.number(value, {
								range: [0, 2]
							})
						},
						apply(target, property, value) {
							target[property] = value
						}
					}
				}}
				color
			/>
			{#if $debug}
				<Portal object={scene}>
					<T.DirectionalLightHelper args={[light]} bind:ref={helper} />
				</Portal>
			{/if}
		</T.DirectionalLight>
	</Transform>
</SheetObject>
