# Threlte Examples

This directory houses all examples that are part of the Threlte docs. Examples are available as part of individual module documentations (such as `/rapier/rigid-body`) or can be referenced in sections that span certain topics, such as "Loading Assets".

## Structure

- **An example can only use relative modules or npm modules**, meaning there **must not** be any imports with path aliases (e.g. `$examples/Component.svelte`) or other path qualifiers.

- An example must be contained in a directory with the name of the example. This directory must contain an `App.svelte` file that is the entry point to the example.

- Only relative imports are allowed (e.g. `import importName from './directory/moduleName'`)

- Svelte components can have TypeScript `<script>` blocks.

- The entry point to an example must be **"App.svelte"**.

## Example

Use the [template](./template) as a starting point for your example

## Placing an example in the docs

To place an example in the docs, navigate to the `.md` file and insert your example as follows:

```mdx
<Example path="path/to/example/directory" />
```
