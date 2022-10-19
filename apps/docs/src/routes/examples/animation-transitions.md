---
title: Animation Transitions
---

<script lang="ts">
import Example from '$examples/animation/transitions/App.svelte'
</script>

# Animation Transitions

<ExampleWrapper playgroundHref="/animation/transitions">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/animation/transitions/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/animation/transitions/Scene.svelte)
@[code svelte|title=Character.svelte](../../examples/animation/transitions/Character.svelte)
@[code ts|title=state.ts](../../examples/animation/transitions/state.ts)

</div>
</ExampleWrapper>

## Handling complexity

Implement a controller that processes inputs from the gui or keyboard/mouse.

A simple setup is to export the `transitionTo` function and calling it directly. Check out this [REPL](https://svelte.dev/repl/8c88a5994afc4c8993d3f600d0ef8ff7?version=3.49.0) as an example.

The example above has a bit more setup: There's some svelte stores within a separate module, assignments triggered by `on:click` events and subscribing/unsubscribing within the component. If you don't want to worry about where things are within your component hierarchy, this is a guide for that direction.
