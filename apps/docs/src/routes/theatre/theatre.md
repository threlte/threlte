---
title: Theatre
---

!!!module_summary title=Theatre|sourcePath=components/Theatre/Theatre.svelte|name=Theatre|from=theatre|type=component|relatedDocs={[{name:"Theatre.js Core Docs",url:"https://www.theatrejs.com/docs/latest/api/core"}]}

The component `<Theatre>` is a convenience shortcut and provides a default `<Project>` and `<Sheet>` to get you set up as fast as possible. It also includes a `<Studio>` which can be disabled with the property `studio`: `<Theatre studio={false} />`

!!!

### Example

The component `<Theatre>` is a good choice if you want to test the waters or to quickly spin up an experiment.

```svelte
<script lang="ts">
	import { Canvas, T } from '@threlte/core'
	import { Editable, Theatre } from '@threlte/theatre'
</script>

<Canvas>
	<Theatre>
		<T.PerspectiveCamera position={[5, 10, 3]}>
			<Editable name="Camera" transform />
		</T.PerspectiveCamera>

		<T.Mesh position.y={0.5}>
			<Editable name="Cube" transform controls />
			<T.BoxGeometry />
			<T.MeshBasicMaterial color="hotpink" />
		</T.Mesh>

		<T.GridHelper />
	</Theatre>
</Canvas>
```
