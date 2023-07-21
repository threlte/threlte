<script lang='ts'>

import XRButton from './button.svelte'

type $$Events = {
  click: { state: 'unsupported' | 'insecure' | 'blocked' | 'supported' }
  error: unknown
}


</script>

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
<XRButton
  {...$$restProps}
  mode='immersive-vr'
  sessionInit={{
    optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers']
  }}
  on:click
  on:error
/>
