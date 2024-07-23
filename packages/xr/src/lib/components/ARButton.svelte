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
  import { defaultFeatures } from '../internal/defaultFeatures'

  type Props = Omit<ComponentProps<XRButton>, 'mode' | 'sessionInit'> & {
    sessionInit?: XRSessionInit & { domOverlay?: { root: HTMLElement } | undefined }
  }

  let { children, ...props }: Props = $props()
</script>

<XRButton
  sessionInit={{
    domOverlay: typeof document !== 'undefined' ? { root: document.body } : undefined,
    ...defaultFeatures
  }}
  {...props}
  mode="immersive-ar"
>
  {@render children?.()}
</XRButton>
