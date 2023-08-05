<script lang="ts">
	import { useRender } from '@threlte/core';

	useRender(({ renderer, scene, camera }) => {
		renderer.render(scene, camera.current);
	});
</script>
