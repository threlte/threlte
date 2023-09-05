<script lang="ts">
	import { T, useLoader } from '@threlte/core';
	import { BatchedParticleRenderer, QuarksLoader } from 'three.quarks';

	const batchSystem = new BatchedParticleRenderer();

	const loader = useLoader(QuarksLoader);

	const system = loader.load('/scene.json');
</script>

<T is={batchSystem} />

{#await system then obj}
	<T is={obj} />
{/await}
