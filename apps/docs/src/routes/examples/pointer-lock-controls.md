---
title: PointerLockingControls
---

<script lang="ts">
import Example from '$examples/camera/pointer-lock-controls/App.svelte'
</script>

# Pointer Locking

<ExampleWrapper playgroundHref="/camera/pointer-lock-controls">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/camera/pointer-lock-controls/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/camera/pointer-lock-controls/Scene.svelte)
@[code svelte|title=Character.svelte](../../examples/camera/pointer-lock-controls/Character.svelte)
@[code svelte|title=PointerLockControls.svelte](../../examples/camera/pointer-lock-controls/PointerLockControls.svelte)

</div>
</ExampleWrapper>

This implementation of `PointerLockControls` is a remix of three.js's pointerlock controls.
