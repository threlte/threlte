---
title: Follow Object
---

<script lang="ts">
import Wrapper from '$examples/camera/followobject/Wrapper.svelte'
</script>

# Follow Object

<ExampleWrapper>
	<Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/camera/followobject/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../examples/camera/followobject/Scene.svelte)
@[code svelte|title=Character.svelte](../../examples/camera/followobject/Character.svelte)
@[code svelte|title=ThirdPersonControls.svelte](../../examples/camera/followobject/ThirdPersonControls.svelte)
&&&

[Open In Playground](/playground/camera/followobject)

This implementation was inspirsed by [SimonDev's](https://twitter.com/iced_coffee_dev) [ThirdPersonCamera](https://github.com/simondevyoutube/ThreeJS_Tutorial_ThirdPersonCamera). You could easily adapt it to work with a pointerlock too 😊
