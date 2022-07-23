---
title: Collider
---

<script lang="ts">
import Wrapper from '$examples/rapier/collider/Wrapper.svelte'
</script>

!!!module_summary title=Collider|sourcePath=/components/Collider/Collider.svelte|name=Collider|from=rapier|type=component

Colliders represent the geometric shapes that generate contacts and collision events when they touch. Attaching one or multiple colliders to a rigid body allow the rigid-body to be affected by contact forces.

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>



&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/rapier/collider/Wrapper.svelte)
@[code svelte|title=Button.svelte](../../examples/rapier/collider/Button.svelte)
@[code svelte|title=Scene.svelte](../../examples/rapier/collider/Scene.svelte)
@[code svelte|title=TestBed.svelte](../../examples/rapier/collider/TestBed.svelte)
@[code svelte|title=Emitter.svelte](../../examples/rapier/collider/Emitter.svelte)
@[code svelte|title=Particle.svelte](../../examples/rapier/collider/Particle.svelte)
@[code svelte|title=AttachedCollider.svelte](../../examples/rapier/collider/AttachedCollider.svelte)
@[code svelte|title=StandaloneCollider.svelte](../../examples/rapier/collider/StandaloneCollider.svelte)
@[code svelte|title=Sensor.svelte](../../examples/rapier/collider/Sensor.svelte)
&&&

!!!
