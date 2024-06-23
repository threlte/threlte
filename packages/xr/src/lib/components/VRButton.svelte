<!--
@component
`<VRButton />` is an HTML `<button />` that can be used to init and display info about your immersive VR session.

```svelte
  <VRButton
    onerror={(event) => {}}
    onclick={(event) => {}}
  />
```
-->
<script lang="ts">
  import type { ComponentProps } from 'svelte'
  import XRButton from './XRButton.svelte'

  type Props = Omit<ComponentProps<XRButton>, 'mode' | 'sessionInit'>

  let { ...props }: Props = $props()
</script>

<XRButton
  sessionInit={{
    optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers']
  }}
  {...props}
  mode="immersive-vr"
/>
