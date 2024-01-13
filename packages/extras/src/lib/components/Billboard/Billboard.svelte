<script lang="ts">
	import { Group, Quaternion } from 'three';
	import { T, useTask, useThrelte } from '@threlte/core';
	import type { BillboardEvents, BillboardProps, BillboardSlots } from './Billboard.svelte';

	type $$Props = Required<BillboardProps>;
	type $$Events = BillboardEvents;
	type $$Slots = BillboardSlots;

	export let follow: $$Props['follow'] = true;
	export let lockX: $$Props['lockX'] = false;
	export let lockY: $$Props['lockY'] = false;
	export let lockZ: $$Props['lockZ'] = false;

	let inner: Group;
	let localRef: Group;

	const { camera } = useThrelte();

	const q = new Quaternion();

	useTask(() => {
		if (!follow || !localRef) return;

		// save previous rotation in case we're locking an axis
		const prevRotation = localRef.rotation.clone();

		// always face the camera
		localRef.updateMatrix();
		localRef.updateWorldMatrix(false, false);
		localRef.getWorldQuaternion(q);
		$camera.getWorldQuaternion(inner.quaternion).premultiply(q.invert());

		// readjust any axis that is locked
		if (lockX) localRef.rotation.x = prevRotation.x;
		if (lockY) localRef.rotation.y = prevRotation.y;
		if (lockZ) localRef.rotation.z = prevRotation.z;
	});
</script>

<T.Group
	bind:ref={localRef}
	matrixAutoUpdate={false}
	matrixWorldAutoUpdate={false}
	{...$$restProps}
>
	<T.Group bind:ref={inner}>
		<slot ref={localRef}/>
	</T.Group>
</T.Group>
