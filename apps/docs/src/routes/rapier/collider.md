---
title: Collider
---

<script lang="ts">
import Wrapper from '$examples/rapier/collider/Wrapper.svelte'
</script>

!!!module_summary title=Collider|sourcePath=/components/Collider/Collider.svelte|name=Collider|from=rapier|type=component

This component provides the basic physics context and loads [rapier](https://rapier.rs/). All components that rely on physics (e.g. `<Collider>` or `<Collider>`) must be a child of `<Collider>`.

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>
<!--
&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/rapier/collider/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../examples/rapier/collider/Scene.svelte)
@[code svelte|title=Door.svelte](../../examples/rapier/collider/Door.svelte)
@[code svelte|title=Player.svelte](../../examples/rapier/collider/Player.svelte)
@[code svelte|title=Ground.svelte](../../examples/rapier/collider/Ground.svelte)
&&& -->
