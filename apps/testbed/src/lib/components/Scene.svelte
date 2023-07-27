<script lang="ts">
	import { types, type ISheet } from '@theatre/core'
	import { T, useThrelte } from '@threlte/core'
	import { Environment, Float, Grid, OrbitControls, Portal } from '@threlte/extras'
	import { Sheet, SheetObject } from '@threlte/theatre'
	import DirLight from './DirLight.svelte'
	import KeyboardControls from './KeyboardControls.svelte'
	import ScrollSheet from './ScrollSheet.svelte'
	import { springScrollPos } from './scrollPos'
	import { cubeGeometry, debug } from './state'
	import AnimatableCube from './AnimatableCube.svelte'
	import { PlaneGeometry } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	let sheet: ISheet | undefined

	$: sheet && (sheet.sequence.position = $springScrollPos * 10)

	const { scene } = useThrelte()
</script>

<!-- <Environment files="kloofendal_43d_clear_puresky_1k.hdr" /> -->

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
	<!-- <DirLight key="Directional Light 1" castShadow />
	<DirLight key="Directional Light 2" /> -->

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

<!-- <T.DirectionalLight position={[1, 3, 1]} /> -->

{#if $debug}
	<Grid />
{/if}
<!-- <Grid cellColor="white" sectionColor="white" position.y={0.01} /> -->

<!-- <ScrollSheet name="Box" startAtScrollPosition={0} endAtScrollPosition={3}>
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
								<Sync color opacity emissive roughness metalness />
							</T.MeshStandardMaterial>
						</T.Mesh>
					</Float>
				</Declare>
			</Transform>
		</KeyboardControls>
	</SheetObject>
</ScrollSheet> -->

<ScrollSheet name="Threlte-Composite" startAtScrollPosition={0} endAtScrollPosition={3}>
	<DirLight key="Directional Light 1" castShadow />
	<DirLight key="Directional Light 2" />
	<SheetObject key="Ambient Light" let:Sync>
		<T.AmbientLight>
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
		</T.AmbientLight>
	</SheetObject>

	<SheetObject key="Fill Light" let:Sync>
		<T.AmbientLight>
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
		</T.AmbientLight>
	</SheetObject>

	<SheetObject key="Composite" let:Transform>
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
	</SheetObject>

	<SheetObject key="Floor" let:Sync>
		<T.Mesh rotation.x={-90 * DEG2RAD} receiveShadow>
			<T.CircleGeometry args={[100, 48]} />
			<T.MeshStandardMaterial>
				<Sync color roughness metalness emissive />
			</T.MeshStandardMaterial>
		</T.Mesh>
	</SheetObject>
</ScrollSheet>
