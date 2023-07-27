<script lang="ts">
	import { type ISheet, types } from '@theatre/core'
	import { T, useFrame, useThrelte } from '@threlte/core'
	import { Environment, Float, Grid, OrbitControls, Portal, useTexture } from '@threlte/extras'
	import { SheetObject } from '@threlte/theatre'
	import AnimatableCube from './AnimatableCube.svelte'
	import AnimatableStarField from './AnimatableStarField.svelte'
	import KeyboardControls from './KeyboardControls.svelte'
	import PostProcessing from './PostProcessing.svelte'
	import ScrollSheet from './ScrollSheet.svelte'
	import { springScrollPos } from './scrollPos'
	import { debug } from './state'

	let sheet: ISheet | undefined

	$: sheet && (sheet.sequence.position = $springScrollPos * 10)

	const { scene } = useThrelte()
</script>

<!-- <PostProcessing /> -->

<Environment files="oil-on-water.png" />

<AnimatableStarField key="Star Field" />
<AnimatableStarField key="Star Field Top" />

<T.PerspectiveCamera
	makeDefault={$debug}
	on:create={({ ref }) => {
		ref.position.set(10, 10, 10)
		ref.lookAt(0, 0, 0)
	}}
>
	{#if $debug}
		<OrbitControls />
	{/if}
</T.PerspectiveCamera>

<ScrollSheet name="Scene" startAtScrollPosition={0} endAtScrollPosition={3}>
	<SheetObject key="Camera" let:Transform let:Sync>
		<KeyboardControls let:transform>
			<Transform {...transform}>
				<T.PerspectiveCamera fov={35} makeDefault={!$debug} let:ref={camera}>
					<Sync fov />
					{#if $debug}
						<Portal object={scene}>
							<T.CameraHelper args={[camera]} />
						</Portal>
					{/if}
				</T.PerspectiveCamera>
			</Transform>
		</KeyboardControls>
	</SheetObject>
</ScrollSheet>

{#if $debug}
	<Grid />
{/if}

<ScrollSheet name="Threlte-Composite" startAtScrollPosition={0} endAtScrollPosition={3}>
	<SheetObject key="Glow" let:Transform let:Sync>
		<KeyboardControls let:transform>
			<Transform {...transform}>
				<T.Mesh>
					<T.PlaneGeometry args={[10, 10]} />
					{#await useTexture('/glow.png') then map}
						<T.MeshBasicMaterial transparent {map}>
							<Sync opacity color />
						</T.MeshBasicMaterial>
					{/await}
					<T.MeshBasicMaterial />
				</T.Mesh>

				<T.Mesh position.z={2}>
					<T.PlaneGeometry args={[10, 10]} />
					{#await useTexture('/glow2.png') then map}
						<T.MeshBasicMaterial transparent {map}>
							<Sync opacity="opacita" color="colora" />
						</T.MeshBasicMaterial>
					{/await}
					<T.MeshBasicMaterial />
				</T.Mesh>
			</Transform>
		</KeyboardControls>
	</SheetObject>

	<SheetObject
		key="Composite"
		let:Transform
		let:Sync
		props={{
			floatIntensity: types.number(1, {
				range: [0, 10]
			}),
			rotationIntensity: types.number(1, {
				range: [0, 10]
			}),
			rotationSpeed: types.number(1, {
				range: [0, 10]
			}),
			floatSpeed: types.number(1, {
				range: [0, 10]
			})
		}}
		let:values
	>
		<Float
			floatIntensity={values.floatIntensity}
			rotationIntensity={values.rotationIntensity}
			rotationSpeed={values.rotationSpeed}
			speed={values.floatSpeed}
		>
			<KeyboardControls let:transform>
				<Transform {...transform}>
					<!-- TOP -->
					<AnimatableCube key="Box Top" />

					<!-- MIDDLE -->
					<AnimatableCube key="Box Middle" />

					<!-- BOTTOM X+ -->
					<AnimatableCube key="Box Bottom X+" />

					<!-- BOTTOM X- -->
					<AnimatableCube key="Box Bottom X-" />

					<!-- BOTTOM Z+ -->
					<AnimatableCube key="Box Bottom Z+" />

					<!-- BOTTOM Z- -->
					<AnimatableCube key="Box Bottom Z-" />
				</Transform>
			</KeyboardControls>
		</Float>
	</SheetObject>
</ScrollSheet>
