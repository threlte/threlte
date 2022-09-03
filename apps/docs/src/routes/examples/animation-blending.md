---
title: Animation Blending
---

<script lang="ts">
import Wrapper from '$examples/animation/blending/Wrapper.svelte'
</script>

# Animation Blending

<ExampleWrapper>
	<Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/animation/blending/Wrapper.svelte)
@[code svelte|title=state.svelte](../../examples/animation/blending/state.svelte)
@[code svelte|title=Scene.svelte](../../examples/animation/blending/Scene.svelte)
@[code svelte|title=Character.svelte](../../examples/animation/blending/Character.svelte)
&&&

[Open In Playground](/playground/animation/blending)

## Handling complexity

You're recommended to implement a connection from gui/keyboard to components that works for you.

A simple setup is to export the `transitionTo` function and calling it directly. Check out this [REPL](https://svelte.dev/repl/8c88a5994afc4c8993d3f600d0ef8ff7?version=3.49.0) as an example.

The example above has a bit more setup. There's some svelte store's within a separate module, assignments triggered by `on:click` events and subscribe + unsubscribing within the component. If you don't want to worry about where things are within your component hierarchy, this is a guide for that direction.

Do the thing that works for your use case.
