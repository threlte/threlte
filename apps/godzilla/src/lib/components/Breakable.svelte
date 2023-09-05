<script lang="ts" context="module">
	import { T } from '@threlte/core';
	import type { CollisionEnterEvent } from '@threlte/rapier';
	import { AutoColliders, RigidBody } from '@threlte/rapier';
	import { Vector3 } from 'three';
	import { ConvexObjectBreaker } from 'three/examples/jsm/misc/ConvexObjectBreaker.js';

	const breaker = new ConvexObjectBreaker();
</script>

<script lang="ts">
	import { HierarchicalObject } from '@threlte/core';
	import type { ContactEvent } from '@threlte/rapier';

	/**
	 * Expects mesh.geometry to be a ConvexGeometry
	 */
	export let fixed = false;
	export let depth = 0;
	export let maxDepth = 1;
	export let minBreakForce = 100;

	/** internal prop for recursive rendering */
	export let mesh: THREE.Object3D | undefined = undefined;

	let debris: THREE.Object3D[] = [];

	const init = () => {
		if (!mesh) return;

		if (depth === 0) {
			// no need to prepare if we're already "broken"!
			breaker.prepareBreakableObject(mesh, 1, new Vector3(), new Vector3(), true);
		}
	};

	$: !!mesh && init();

	/** used as signal if collision happened */
	let impactV: Vector3 | undefined;
	let impactN: Vector3 | undefined;

	const onCollisionEnter = (e: CollisionEnterEvent) => {
		if (!mesh) return;

		if (depth >= maxDepth) return;

		const contacts = e.manifold.numContacts();
		if (contacts === 0) return;

		const contactPoint = e.manifold.localContactPoint1(0);
		if (!contactPoint) return;

		impactV = new Vector3(contactPoint.x, contactPoint.y, contactPoint.z);
	};

	const onContact = (e: ContactEvent) => {
		if (!mesh) return;

		if (!impactV) return;

		if (e.totalForceMagnitude < minBreakForce) {
			// if the force is too small, we don't break, but reset the impactV
			impactV = undefined;
			return;
		}

		const normal = e.maxForceDirection;
		impactN = new Vector3(normal.x, normal.y, normal.z);

		debris = breaker.subdivideByImpact(mesh, impactV, impactN, 2, 1);
	};
</script>

{#if depth === 0}
	<HierarchicalObject
		onChildMount={(child) => {
			mesh = child;
		}}
		onChildDestroy={() => {
			mesh = undefined;
		}}
	>
		<slot broken={debris.length} />
	</HierarchicalObject>
{/if}

{#if debris.length}
	{#each debris as object}
		<T.Group scale={0.95}>
			<svelte:self mesh={object} depth={depth + 1} {maxDepth} {minBreakForce} />
		</T.Group>
	{/each}
{:else if mesh}
	<RigidBody
		type={fixed ? 'fixed' : 'dynamic'}
		on:collisionenter={onCollisionEnter}
		on:contact={onContact}
	>
		<AutoColliders shape="convexHull">
			<T is={mesh} />
		</AutoColliders>
	</RigidBody>
{/if}
