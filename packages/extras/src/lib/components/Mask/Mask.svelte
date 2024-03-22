<script lang="ts">
	import { T } from '@threlte/core';
	import { ReplaceStencilOp, AlwaysStencilFunc, type Mesh } from 'three';

	export let id = 1;
	export let colorWrite = false;
	export let depthWrite = false;

	let ref: Mesh;

	const meshLoaded = (mesh: Mesh) => {
		if (!mesh) return;
		const material = mesh.material;
		if (Array.isArray(material)) return;
		material.colorWrite = colorWrite;
		material.depthWrite = depthWrite;
		material.stencilWrite = true;
		material.stencilRef = id;
		material.stencilFunc = AlwaysStencilFunc;
		material.stencilFail = ReplaceStencilOp;
		material.stencilZFail = ReplaceStencilOp;
		material.stencilZPass = ReplaceStencilOp;
	};

	$: meshLoaded(ref);

	$: {
		meshLoaded(ref);
		id;
	}
</script>

<T.Mesh {...$$restProps} renderOrder={-id} bind:ref>
	<slot />
</T.Mesh>
