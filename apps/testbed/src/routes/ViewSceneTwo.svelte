<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, interactivity } from '@threlte/extras';
	import { DoubleSide } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';

	export let element: HTMLElement;

	interactivity({
		target: element
	});

	let color: string = 'blue';
</script>

<T.OrthographicCamera
	makeDefault
	zoom={60}
	position={[3, 5, 3]}
	on:create={({ ref }) => ref.lookAt(0, 2, 0)}
>
	<OrbitControls target={[0, 2, 0]} />
</T.OrthographicCamera>

<T.Mesh
	castShadow
	position.y={2}
	on:pointerenter={() => {
		color = 'green';
	}}
	on:pointerleave={() => {
		color = 'blue';
	}}
>
	<T.MeshStandardMaterial {color} />
	<T.IcosahedronGeometry />
</T.Mesh>

<T.Mesh rotation.x={-90 * DEG2RAD} receiveShadow>
	<T.PlaneGeometry args={[10, 10]} />
	<T.MeshStandardMaterial />
</T.Mesh>

<T.DirectionalLight castShadow position={[1, 10, 10]} />
<T.AmbientLight intensity={0.3} />
