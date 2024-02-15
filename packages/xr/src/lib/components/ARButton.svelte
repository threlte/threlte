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
<script lang="ts">
  import type { ComponentProps } from 'svelte'
  import XRButton from './XRButton.svelte'

  type $$Props = Omit<ComponentProps<XRButton>, 'mode' | 'sessionInit'> & {
    sessionInit?: XRSessionInit & { domOverlay?: { root: HTMLElement } | undefined }
  }
</script>

<XRButton
  sessionInit={{
    domOverlay: typeof document !== 'undefined' ? { root: document.body } : undefined,
    requiredFeatures: ['plane-detection'],
    optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers', 'hit-test']
  }}
  {...$$restProps}
  mode="immersive-ar"
  on:click
  on:error
/>
