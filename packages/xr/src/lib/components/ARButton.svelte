<!--
@component
`<ARButton />` is an HTML `<button />` that can be used to init and display info about your immersive AR session.

```svelte
  <ARButton
    on:error={(event) => {}}
    on:click={(event) => {}}
  />
```
-->

<script lang='ts'>
  import type { ComponentProps } from 'svelte'
  import XRButton from './XRButton.svelte'

  type $$Props = Omit<ComponentProps<XRButton>, 'mode' | 'sessionInit'>
</script>

<XRButton
  {...$$restProps}
  mode='immersive-ar'
  sessionInit={{
    domOverlay: typeof document !== 'undefined' ? { root: document.body } : undefined,
    optionalFeatures: ['hit-test', 'dom-overlay', 'dom-overlay-for-handheld-ar']
  }}
  on:click
  on:error
/>
