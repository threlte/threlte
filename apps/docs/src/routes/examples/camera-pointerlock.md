---
title: Pointer Locking
---

<script lang="ts">
import Example from '$examples/camera/pointerlock/App.svelte'
</script>

# Pointer Locking

<ExampleWrapper playgroundHref="/camera/pointerlock">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/camera/pointerlock/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/camera/pointerlock/Scene.svelte)
@[code svelte|title=Character.svelte](../../examples/camera/pointerlock/Character.svelte)
@[code svelte|title=PointerLockControls.svelte](../../examples/camera/pointerlock/PointerLockControls.svelte)

</div>
</ExampleWrapper>

This implementation of PointerLockControls is a remix of three.js's pointerlock controls but more svelte'y 🚀

Remember remixing three.js more for your purpose is an option.
