---
title: RigidBody
---

<script lang="ts">
import Wrapper from '$examples/rapier/rigid-body/Wrapper.svelte'
</script>

!!!module_summary title=RigidBody|sourcePath=/components/RigidBody/RigidBody.svelte|name=RigidBody|from=rapier|type=component

This component provides the basic physics context and loads [rapier](https://rapier.rs/). All components that rely on physics (e.g. `<RigidBody>` or `<Collider>`) must be a child of `<RigidBody>`.

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>
<!--
&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/rapier/RigidBody/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../examples/rapier/RigidBody/Scene.svelte)
@[code svelte|title=Door.svelte](../../examples/rapier/RigidBody/Door.svelte)
@[code svelte|title=Player.svelte](../../examples/rapier/RigidBody/Player.svelte)
@[code svelte|title=Ground.svelte](../../examples/rapier/RigidBody/Ground.svelte)
&&& -->
