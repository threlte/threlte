# Threlte Examples

This directory houses all examples that are part of the threlte docs and the playground. Examples are available as part of individual module documentations (such as `/rapier/rigid-body`) or can be loaded directly into the playground (such as `/playground/rapier/rigid-body`).

## Structure

- **An example can only use relative modules or npm modules**, meaning there **must not** be any imports with path aliases (e.g. `$examples/Component.svelte`) or other path qualifiers.

- Allowed file extensions are:
	- .svelte
		- Must be imported as a fully qualified path `import Component from './Component.svelte'`
	- .ts
		- Must be imported without an extension `import importName from './moduleName'`

- All relative imports are allowed (e.g. `import importName from '../utils/moduleName'` or `import importName from './directory/moduleName'`)

- Svelte components can have TypeScript `<script>` blocks. These will be preprocessed and transpiled before being loaded into a playground.

- TypeScript files will be transpiled before being loaded into a playground.

- The entry point to an example must be **"App.svelte"** as all relative imports will be resolved from there.

## Example

Use the [template](./template) as a starting point for your example

## Placing an example in the docs

To place an example in the docs, navigate to the `.md` file and import your "App.svelte" entry point. Wrap your example with the component `<ExampleWrapper>` and insert the code block:

```svelte
<script lang="ts">
	import Example from '$examples/new-example/App.svelte'
</script>

<ExampleWrapper playgroundHref="/new-example">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/new-example/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/new-example/Scene.svelte)

</div>
</ExampleWrapper>
```

## Loading an example in a playground

Append the directory path to your example to the url "https://threlte.xyz/playground/" and this will automatically load your example into the playground:

- Directory for new example: `src/examples/new-example`
- Playground URL for this example: https://threlte.xyz/playground/new-example
