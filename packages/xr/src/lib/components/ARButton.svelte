<!--
@component
`<ARButton />` is an HTML `<button />` that can be used to init and display info about your immersive AR session.

```svelte
  <ARButton
    onerror={(event) => {}}
    onclick={(event) => {}}
  />
```
-->
<script lang="ts">
  import type { ComponentProps } from 'svelte'
  import XRButton from './XRButton.svelte'

  type Props = Omit<ComponentProps<XRButton>, 'mode' | 'sessionInit'> & {
    sessionInit?: XRSessionInit & { domOverlay?: { root: HTMLElement } | undefined }
  }

  let { ...props }: Props = $props()
</script>

<XRButton
  sessionInit={{
    domOverlay: typeof document !== 'undefined' ? { root: document.body } : undefined,
    requiredFeatures: ['plane-detection'],
    optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers', 'hit-test']
  }}
  {...props}
  mode="immersive-ar"
/>
