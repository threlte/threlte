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
@[code svelte|title=State.svelte](../../examples/animation/blending/State.svelte)
@[code svelte|title=Scene.svelte](../../examples/animation/blending/Scene.svelte)
@[code svelte|title=Character.svelte](../../examples/animation/blending/Character.svelte)
&&&

## Handling complexity

You're recommended to implement a connection from gui/keyboard to components that works for you.

A simplier setup is to export the `transitionTo` function and calling it directly.

Within this example above there's some svelte store's within a separate module, assignments triggered by `on:click` events and subscribe + unsubscribing within the component. Doing this means you don't need to worry where things are within your component hierarchy.
