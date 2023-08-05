<script lang="ts">
	import { T } from '@threlte/core';
	import { interactivity } from '@threlte/extras';

	export let element: HTMLElement;

	interactivity({
		target: element
	});

	let color: string = 'blue';
</script>

<T.OrthographicCamera
	makeDefault
	zoom={100}
	position={[3, 2, 3]}
	on:create={({ ref }) => ref.lookAt(0, 0, 0)}
/>

<T.Mesh
	on:pointerenter={() => {
		color = 'green';
	}}
	on:pointerleave={() => {
		color = 'blue';
	}}
>
	<T.MeshStandardMaterial {color} />
	<T.BoxGeometry />
</T.Mesh>
<T.DirectionalLight />
<T.AmbientLight />
