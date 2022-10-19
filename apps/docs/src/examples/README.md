# Threlte Examples

This directory houses all examples that are part of the threlte docs and the playground. Examples are available as part of individual module documentations (such as `/rapier/rigid-body`) or can be loaded directly into the playground (such as `/playground/rapier/rigid-body`).

## Structure

- **An example must be contained in itself**, meaning there cannot be any import from modules outside the example directory (exempt from this rule are npm packages).

- Allowed file extensions are:
	- .svelte
	- .ts

- Svelte components can have TypeScript `<script>` blocks. These will be preprocessed and transpiled before being loaded into a playground.

- TypeScript files will be transpiled before being loaded into a playground.

- The entry point to an example must be **"App.svelte"**

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

@[code svelte|title=Wrapper.svelte](../../examples/new-example/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/new-example/Scene.svelte)

</div>
</ExampleWrapper>
```

## Loading an example in a playground

Append the directory path to your example to the url "https://threlte.xyz/playground/" and this will automatically load your example into the playground:

- Directory for new example: `src/examples/new-example`
- Playground URL for this example: https://threlte.xyz/playground/new-example
