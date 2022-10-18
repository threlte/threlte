<script lang="ts">
	import { Group, Mesh, useFrame, type Position, type Rotation, type Scale } from '@threlte/core'
	import { Edges, useGltf } from '@threlte/extras'
	import { derived } from 'svelte/store'
	import {
		Color,
		CylinderBufferGeometry,
		Mesh as ThreeMesh,
		MeshBasicMaterial,
		MeshStandardMaterial
	} from 'three'

	export let discSpeed = 0

	export let position: Position | undefined = undefined
	export let rotation: Rotation | undefined = undefined
	export let scale: Scale | undefined = undefined

	let discRotation = 0
	const { start, stop, started } = useFrame(
		() => {
			discRotation += 0.02 * discSpeed
		},
		{
			autostart: false
		}
	)
	$: {
		if (discSpeed <= 0 && $started) stop()
		else if (discSpeed > 0 && !$started) start()
	}

	const { gltf } = useGltf<'Logo'>('/models/turntable/disc-logo.glb')
	const logoGeometry = derived(gltf, (gltf) => {
		if (!gltf) return undefined
		const mesh = gltf.nodes.Logo as ThreeMesh
		return mesh.geometry
	})
</script>

<Group {position} {rotation} {scale}>
	<Group rotation={{ y: -discRotation }}>
		<!-- DISH (?) -->
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 0.1 }}
			geometry={new CylinderBufferGeometry(1.85, 2, 0.2, 64)}
			material={new MeshStandardMaterial({
				color: 0x111111
			})}
		>
			<Edges color="black" threshold={20} ignorePointer />
		</Mesh>

		<!-- ACTUAL DISC -->
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 0.2 + 0.05 }}
			material={new MeshStandardMaterial({
				color: 0x111111
			})}
			geometry={new CylinderBufferGeometry(1.75, 1.75, 0.05, 64)}
			ignorePointer
		>
			<Edges threshold={50} ignorePointer scale={1} color="black" />
		</Mesh>

		<!-- ROUND LABEL -->
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 0.2 + 0.05 + 0.005 }}
			material={new MeshStandardMaterial({
				color: 0xeedbcb
			})}
			geometry={new CylinderBufferGeometry(0.8, 0.8, 0.05, 64)}
			ignorePointer
		>
			<Edges threshold={50} ignorePointer scale={1} color="black" />
		</Mesh>

		<!-- LOGO -->
		{#if $logoGeometry}
			<Mesh
				ignorePointer
				geometry={$logoGeometry}
				material={new MeshBasicMaterial({
					color: new Color(0xff3e00).convertSRGBToLinear(),
					toneMapped: false
				})}
				position={{ y: 0.2 + 0.05 + 0.025 + 0.01 }}
			/>
		{/if}
	</Group>
</Group>
