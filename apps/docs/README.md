## 👀 Our docs are built using Astro Starlight

Feel free to ask questions in our [Discord server](https://discord.gg/EqUBCfCaGm) or check out [their documentation](https://starlight.astro.build/).

## TODO

- Content
  - Studio Tutorial initial overlay positioning
  - Audio not working in reference/rapier/components/rigid-body
  - Revisit types section of custom-abstractions page `import { SvelteComponent } from 'svelte'`
  - Core/Hierarchy page. needs revision?
  - Examples and Components not working correctly
    - webgpu, scope with zoom, animating a spaceship, outlines, etc...
    - <Text> not rendering. error: `Material: onBeforeRender() has been removed.`
    - <Text3DGeometry> not rendering.
      - error: `Material: onBeforeRender() has been removed.`
      - error: `TypeError: Cannot read properties of undefined (reading 'position')`
    - `useCursor`
      - error: `Material: onBeforeRender()`
- Scripts folder may need revision
- Remove "src/examples" from tsconfig
- Large asset size reduction

## Notes

- Public folder is for assets that aren't preprocessed
  - https://docs.astro.build/en/guides/images/
