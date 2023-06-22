<script lang="ts">
	import { onMount } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

  import { T } from '@threlte/core'
  import { OrbitControls, Grid, ContactShadows } from '@threlte/extras'

  import { PlaneGeometry } from 'three'

  import Maze from './Maze.svelte'
  import CustomRenderer from './CustomRenderer.svelte'

  const route = [
		[0, 1, -3],
		[0, 1, 1.5],
		[4.7, 1, 1.5],
		[4.7, 1, 5],
		[2, 1, 5],
		[2, 1, 9],
		[8, 1, 9],
		[8, 1, -3]
	];
	let routeIndex = 0;
	let cubePosition = tweened(route[routeIndex], {
		duration: 400,
		easing: quadInOut,
	});
	let outlinedCube;

	onMount(() => {
		const interval = setInterval(nextCubePosition, 500);

		return () => {
			clearInterval(interval);
		};
	});

	const nextCubePosition = () => {
		if (routeIndex < route.length - 1) {
			routeIndex++;
		} else {
			routeIndex = 0;
		}
		cubePosition.set(route[routeIndex]);
	};
</script>

<Maze />

<T.Mesh position={$cubePosition} bind:ref={outlinedCube}>
  <T.MeshToonMaterial color="gold" />
  <T.BoxGeometry />
</T.Mesh>

<CustomRenderer selectedMesh={outlinedCube} />

<T.PerspectiveCamera
  makeDefault
  position={[0, 6, -10]}
  fov={15}
  zoom={0.2}
>
  <OrbitControls enableZoom={true} enableDamping target={[0, 0, 5]}/>
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.2} />

<Grid
  gridSize={18}
  position={[0, -0.001, 5]}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={25}
/>
