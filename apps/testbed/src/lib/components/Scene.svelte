<script lang="ts">
	import { T } from '@threlte/core';
	import { types } from '@theatre/core';
	import { ContactShadows, Float, Grid, OrbitControls } from '@threlte/extras';
	import { SheetObject } from '@threlte/theatre';
	import { DEG2RAD } from 'three/src/math/MathUtils';
</script>

<SheetObject key="hello" let:AutoProps>
	<T.PerspectiveCamera let:ref makeDefault position={[-10, 10, 10]} fov={15}>
		<AutoProps {ref} />
		<OrbitControls
			autoRotate
			enableZoom={false}
			enableDamping
			autoRotateSpeed={0.5}
			target.y={1.5}
		/>
	</T.PerspectiveCamera>

	<T.DirectionalLight
		let:ref
		intensity={0.8}
		position.x={5}
		position.y={10}
		rotation.x={10 * DEG2RAD}
	>
		<AutoProps {ref} intensity rotation />
	</T.DirectionalLight>
	<T.AmbientLight intensity={0.2} />

	<Grid
		position.y={-0.001}
		cellColor="#ffffff"
		sectionColor="#ffffff"
		sectionThickness={0}
		fadeDistance={25}
		cellSize={2}
		let:ref
	>
		<AutoProps position {ref} scale />
	</Grid>

	<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />

	<Float floatIntensity={1} floatingRange={[0, 1]}>
		<T.Mesh position.y={1.2} position.z={-0.75} let:ref>
			<AutoProps {ref} position={{ key: 'posmesh', label: 'Position Mesh' }} />
			<T.BoxGeometry />
			<T.MeshPhysicalMaterial let:ref color="#0059BA" transparent>
				<AutoProps
					{ref}
					transmission
					ior
					clearcoat
					thickness
					attenuationColor
					attenuationDistance
					opacity
					metalness
					roughness
					emissive
					side
					color
					color.r={{
						label: 'Red Channel',
						transformer: {
							transform(value) {
								return types.boolean(Boolean(value));
							},
							apply(target, property, value) {
								if (value) {
									target[property] = 1;
								} else {
									target[property] = 0;
								}
							}
						}
					}}
				/>
			</T.MeshPhysicalMaterial>
		</T.Mesh>
	</Float>

	<Float floatIntensity={1} floatingRange={[0, 1]}>
		<T.Mesh position={[1.2, 1.5, 0.75]} rotation.x={5} rotation.y={71}>
			<T.TorusKnotGeometry args={[0.5, 0.15, 100, 12, 2, 3]} />
			<T.MeshStandardMaterial color="#F85122" />
		</T.Mesh>
	</Float>

	<Float floatIntensity={1} floatingRange={[0, 1]}>
		<T.Mesh
			position={[-1.4, 1.5, 0.75]}
			rotation={[-5, 128, 10]}
			on:click={() => {
				console.log('click');
			}}
		>
			<T.IcosahedronGeometry />
			<T.MeshStandardMaterial color="#F8EBCE" />
		</T.Mesh>
	</Float>
</SheetObject>
