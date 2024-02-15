<!--
@component
`<VRButton />` is an HTML `<button />` that can be used to init and display info about your immersive VR session.

```svelte
  <VRButton
    on:error={(event) => {}}
    on:click={(event) => {}}
  />
```
-->
<script lang="ts">
  import type { ComponentProps } from 'svelte'
  import XRButton from './XRButton.svelte'

  type $$Props = Omit<ComponentProps<XRButton>, 'mode' | 'sessionInit'>
</script>

<XRButton
  sessionInit={{
    optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers']
  }}
  {...$$restProps}
  mode="immersive-vr"
  on:click
  on:error
/>
