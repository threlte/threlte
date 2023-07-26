<script lang="ts">
	import { types, type ISheet } from '@theatre/core'
	import { T, useThrelte } from '@threlte/core'
	import { Float, Grid, OrbitControls, Portal } from '@threlte/extras'
	import { SheetObject } from '@threlte/theatre'
	import KeyboardControls from './KeyboardControls.svelte'
	import ScrollSheet from './ScrollSheet.svelte'
	import { springScrollPos } from './scrollPos'
	import { cubeGeometry, debug } from './state'

	let sheet: ISheet | undefined

	$: sheet && (sheet.sequence.position = $springScrollPos * 10)

	const { scene } = useThrelte()
</script>

<T.PerspectiveCamera
	makeDefault={$debug}
	on:create={({ ref }) => {
		ref.position.set(10, 10, 10)
		ref.lookAt(0, 0, 0)
	}}
>
	{#if $debug}
		<OrbitControls enableZoom={false} />
	{/if}
</T.PerspectiveCamera>

<T.DirectionalLight position={[1, 3, 1]} />

{#if $debug}
	<Grid />
{/if}

<T.PerspectiveCamera position.z={10} makeDefault={!$debug} let:ref={camera}>
	{#if $debug}
		<Portal object={scene}>
			<T.CameraHelper args={[camera]} />
		</Portal>
	{/if}
</T.PerspectiveCamera>

<ScrollSheet name="Box" startAtScrollPosition={0} endAtScrollPosition={4}>
	<SheetObject key="Box" let:Transform let:Sync let:Declare>
		<KeyboardControls let:transform>
			<Transform {...transform}>
				<Declare
					props={{
						floatIntensity: 0
					}}
					let:values
				>
					<Float floatIntensity={values.floatIntensity}>
						<T.Mesh>
							<T is={$cubeGeometry} />
							<T.MeshStandardMaterial transparent>
								<Sync color opacity emissive />
							</T.MeshStandardMaterial>
						</T.Mesh>
					</Float>
				</Declare>
			</Transform>
		</KeyboardControls>
	</SheetObject>
</ScrollSheet>
