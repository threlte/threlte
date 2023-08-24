<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider } from '@threlte/rapier'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import Emitter from './Emitter.svelte'
  import TestBed from './TestBed.svelte'
</script>

<!-- STANDALONE COLLIDER -->
<T.Group
  rotation={[0, 45 * DEG2RAD, 0]}
  position={[0, 1, 0]}
>
  <Collider
    shape={'cuboid'}
    args={[1, 1, 1]}
  />
</T.Group>

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
