<script lang="ts">
	import { OrbitControls, T } from '@threlte/core'
	import { BoxGeometry } from 'three'
	const boxColors = [
		'#3c42c4',
		'#6e51c8',
		'#a065cd',
		'#ce79d2',
		'#d68fb8',
		'#dda2a3',
		'#eac4ae',
		'#f4dfbe'
	]
</script>

<T.PerspectiveCamera makeDefault position={[0, 10, 20]} fov={36} target={[0, 0, 0]}>
	<OrbitControls />
</T.PerspectiveCamera>

<!-- Make a box in every second cell to show aligment -->

{#each { length: 10 } as h, x}
	{#each { length: 10 } as v, y}
		{#if x % 2 == 0 && y % 2 == 0}
			<T.Group position={[x - 4.5, 0.5, y - 4.5]}>
				<T.Mesh>
					<T.BoxGeometry />
					<T.MeshBasicMaterial
						args={[
							{
								color: boxColors[Math.floor(Math.random() * boxColors.length)],
								opacity: 0.9,
								transparent: true
							}
						]}
					/>
				</T.Mesh>
				<T.LineSegments>
					<T.EdgesGeometry args={[new BoxGeometry()]} />

					<T.MeshBasicMaterial
						args={[
							{
								color: 0x000000
							}
						]}
					/>
				</T.LineSegments>
			</T.Group>
		{/if}
	{/each}
{/each}

<!-- <T.Mesh position={[0, -0.5, 0]}>
	<T.BoxGeometry args={[200, 0.2, 200]} />
	<T.MeshBasicMaterial
		args={[
			{
				color: '#121212'
			}
		]}
	/>
</T.Mesh> -->
