<script lang="ts">
	import type {
		RigidBody as RapierRigidBody,
		Collider as RapierCollider
	} from '@dimforge/rapier3d-compat';
	import { T, useFrame } from '@threlte/core';
	import { Collider, RigidBody } from '@threlte/rapier';
	import { Group, Vector3 } from 'three';

	const group = new Group();
	let rigidBody: RapierRigidBody;
	let collider: RapierCollider;

	const groupWorldPosition = new Vector3();

	useFrame(() => {
		group.getWorldPosition(groupWorldPosition);
		if (!collider) return;

		collider.setTranslation({
			x: groupWorldPosition.x,
			y: groupWorldPosition.y,
			z: groupWorldPosition.z
		});

		// if (!rigidBody) return;

		// rigidBody.setTranslation(
		// 	{ x: groupWorldPosition.x, y: groupWorldPosition.y, z: groupWorldPosition.z },
		// 	true
		// );
	});
</script>

<T is={group}>
	<!-- <RigidBody bind:rigidBody type="kinematicPosition"> -->
	<Collider shape="ball" args={[0.15]} bind:collider />
	<!-- </RigidBody> -->
</T>
