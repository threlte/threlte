<script lang="ts">
	import { Collider } from '@threlte/rapier'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Emitter from './Emitter.svelte'
	import TestBed from './TestBed.svelte'
</script>

<!-- STANDALONE COLLIDER -->
<Collider rotation={{ y: 45 * DEG2RAD }} shape={'cuboid'} position={{ y: 1 }} args={[1, 1, 1]} />

<Emitter />

<TestBed title={'Standalone Collider'}>
	<div slot="text">
		<p>
			This collider is not a child of a {'<RigidBody>'} component.<br />
			It will participate in contacts and collisions but is not affected by gravity or external forces.
			This can be useful for the environment.
		</p>
		<p>Standalone colliders have reactive transform properties.</p>
	</div>
</TestBed>
