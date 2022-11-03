---
title: Three22
---

<script lang="ts">
import ExampleSimple from '$examples/core/three2-all/App.svelte'
import ExampleArcadeMachine from '$examples/core/three-arcade-game/App.svelte'
</script>

!!!module_summary title=Three2|sourcePath=/components/Three2/Three2.svelte|name=Three2|from=extras|type=component

<ExampleWrapper playgroundHref="/core/three2-all">
<ExampleSimple />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/core/three2-all/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/core/three2-all/Scene.svelte)

</div>
</ExampleWrapper>

<ExampleWrapper playgroundHref="/core/three-arcade-game">
<ExampleArcadeMachine />
</ExampleWrapper>

!!!
