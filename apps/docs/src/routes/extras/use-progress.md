---
title: useProgress
---

<script lang="ts">
import Wrapper from '$examples/use-progress/Wrapper.svelte'
</script>

!!!module_summary title=useProgress|sourcePath=hooks/useProgress.ts|name=useProgress|from=extras|type=hook|relatedDocs={[{name:"three.js DefaultLoadingManager reference",url:"https://threejs.org/docs/api/en/loaders/managers/DefaultLoadingManager.html"}]}
Convenience hook that wraps `THREE.DefaultLoadingManager`.

<ExampleWrapper playgroundHref="/use-progress">
  <Wrapper />
</ExampleWrapper>

<small>Model: Battle Damaged Sci-fi Helmet by [theblueturtle\_](https://sketchfab.com/theblueturtle_)</small>

!!!

### Examples <!-- omit in toc -->

#### Basic Example

You can use and place this hook anywhere. Typically you would use this hook outside of your `<Canvas>` component to show a loading indicator in your DOM.

```svelte
<script lang="ts">
  // `useProgress` returns readable stores
  const {
		active, // Readable<boolean> – if the DefaultLoadingManager is active
		item, // Readable<string | undefined> – the currently loading item
		loaded, // Readable<number> - amount of items loaded
		total, // Readable<number> - total amount of items to load
		errors, // Readable<string[]> - all error messages
		progress, // Readable<number> - normalized (0-1) loading progress
	} = useProgress()
</script>
```
