---
title: Studio
---

!!!module_summary title=Studio|sourcePath=components/Studio/Studio.svelte|name=Studio|from=theatre|type=component|relatedDocs={[{name:"Theatre.js Studio Docs",url:"https://www.theatrejs.com/docs/latest/api/studio"}]}

The component `<Studio>` adds the interface of Theatre.js.

!!!

### Example

In most cases, you want the interface while editing animations or laying out scenes. While other parts of Theatre.js are performant and built for production, `@theatre/studio` is currently not. You should not include that in your production bundle.

```svelte
<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Studio } from '@threlte/theatre'
	import Scene from './Scene.svelte'

	// Using SvelteKit
	import { dev } from '$app/environment';
</script>

<Studio enabled={dev}>

<Canvas>
	<Scene />
</Canvas>
```
