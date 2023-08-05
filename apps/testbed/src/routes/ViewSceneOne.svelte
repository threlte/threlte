<script lang="ts">
	import { T } from '@threlte/core';
	import { interactivity } from '@threlte/extras';

	export let element: HTMLElement;

	interactivity({
		target: element
	});

	let color: string = 'hotpink';
</script>

<T.PerspectiveCamera
	makeDefault
	position={[3, 3, 3]}
	on:create={({ ref }) => ref.lookAt(0, 0, 0)}
/>

<T.Mesh
	on:pointerenter={() => {
		color = 'red';
	}}
	on:pointerleave={() => {
		color = 'hotpink';
	}}
>
	<T.MeshStandardMaterial {color} />
	<T.BoxGeometry />
</T.Mesh>
<T.DirectionalLight />
<T.AmbientLight />
