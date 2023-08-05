<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { transitions, interactivity, Plugins } from '@threlte/extras';
</script>

```svelte
<Canvas>
	<Plugins plugins={[transitions, () => interactivity({ target: someElement })]}>
		<T.Mesh
			on:click={() => {
				console.log('click');
			}}
		>
			<T.BoxGeometry />
			<T.MeshBasicMaterial />
		</T.Mesh>
	</Plugins>
</Canvas>
```
