---
title: Project
---

!!!module_summary title=Project|sourcePath=components/Project/Project.svelte|name=Project|from=theatre|type=component|relatedDocs={[{name:"Theatre.js Project Docs",url:"https://www.theatrejs.com/docs/latest/api/core#project"}]}

All your work in Theatre.js is organized into projects. Projects are a way to organize related work.

Theatre.js allows you to save the state of a project and load it via `<Project config={{ state }}>`. We can create multiple projects, but often one project is sufficient for a whole threlte application.

!!!

### Creating a Project

```svelte
<script>
	import { Project, Sheet, Editable } from '@threlte/theatre'
</script>

<!-- Will create a project with the name "Project A" -->
<Project name="Project A">
	<Sheet name="Sheet A">
		<Editable name="Editable A" />
	</Sheet>
</Project>
```

### Loading a Saved State

The state of a project can be saved from the interface provided by [`<Studio>`](/theatre/studio). It's a JSON file containing all animated and static properties of all sheets of the project.

```svelte
<script>
	import { Project, Sheet, Editable } from '@threlte/theatre'
	import state from '.state.json'
</script>

<!--
	Will create a project with the name "Project A",
	load its state and mount all children when
	finished loading
-->
<Project config={{ state }} name="Project A">
	<Sheet name="Sheet A" autoPlay>
		<Editable name="Editable A" />
	</Sheet>
</Project>
```
