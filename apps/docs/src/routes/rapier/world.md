---
title: World
---

<script lang="ts">
import Wrapper from '$examples/rapier/world/Wrapper.svelte'
</script>

!!!module_summary title=World|sourcePath=/components/World/World.svelte|name=World|from=rapier|type=component

This component provides the basic physics context and loads [rapier](https://rapier.rs/). All components that rely on physics (e.g. `<RigidBody>` or `<Collider>`) must be a child of `<World>`.

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/rapier/world/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../examples/rapier/world/Scene.svelte)
@[code svelte|title=Door.svelte](../../examples/rapier/world/Door.svelte)
@[code svelte|title=Player.svelte](../../examples/rapier/world/Player.svelte)
@[code svelte|title=Ground.svelte](../../examples/rapier/world/Ground.svelte)
&&&

!!!

### Structure

A typical structure of a physics-enabled wrapper component might look like this:
```svelte title="Wrapper.svelte"
<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'
	import Scene from './Scene.svelte'
</script>

<Canvas>
	<World>
		<Scene />
	</World>
</Canvas>
```

This structure ensures that all components inside the component `<Scene>` have access to the physics context.

### Fallback

[rapier](https://rapier.rs/) is a Rust-based physics engine and as such bundled and used as a WASM module. If loading of rapier fails for any reason, a slot with the name `fallback` is mounted to e.g. display a fallback scene without physics.

```svelte title="Wrapper.svelte"
<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'
	import Scene from './Scene.svelte'
	import FallbackScene from './FallbackScene.svelte'
</script>

<Canvas>
	<World>
		<Scene />
		<FallbackScene slot="fallback" />
	</World>
</Canvas>
```

### Properties

Apart from `gravity`, all props are used to initialize the world and thus are not reactive.

```ts
// optional
gravity: Position | undefined = { y: -9.81 }
rawIntegrationParameters: RawIntegrationParameters | undefined = undefind
rawIslands: RawIslandManager | undefined = undefind
rawBroadPhase: RawBroadPhase | undefined = undefind
rawNarrowPhase: RawNarrowPhase | undefined = undefind
rawBodies: RawRigidBodySet | undefined = undefind
rawColliders: RawColliderSet | undefined = undefind
rawImpulseJoints: RawImpulseJointSet | undefined = undefind
rawMultibodyJoints: RawMultibodyJointSet | undefined = undefind
rawCCDSolver: RawCCDSolver | undefined = undefind
rawQueryPipeline: RawQueryPipeline | undefined = undefind
rawPhysicsPipeline: RawPhysicsPipeline | undefined = undefind
rawSerializationPipeline: RawSerializationPipeline | undefined = undefind
rawDebugRenderPipeline: RawDebugRenderPipeline | undefined = undefind
```
