---
title: Follow Object
---

<script lang="ts">
import Example from '$examples/camera/followobject/App.svelte'
</script>

# Follow Object

<ExampleWrapper playgroundHref="/camera/followobject">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/camera/followobject/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/camera/followobject/Scene.svelte)
@[code svelte|title=Character.svelte](../../examples/camera/followobject/Character.svelte)
@[code svelte|title=ThirdPersonControls.svelte](../../examples/camera/followobject/ThirdPersonControls.svelte)

</div>
</ExampleWrapper>

This implementation was inspirsed by [SimonDev's](https://twitter.com/iced_coffee_dev) [ThirdPersonCamera](https://github.com/simondevyoutube/ThreeJS_Tutorial_ThirdPersonCamera). You could easily adapt it to work with a pointerlock too 😊
