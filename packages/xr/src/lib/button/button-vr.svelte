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

<script lang='ts'>

import XRButton from './button-xr.svelte'

type $$Events = {
  /** Fires when a user clicks the VR button. */
  click: { state: 'unsupported' | 'insecure' | 'blocked' | 'supported' }
  /** Fires when an enter / exit session error occurs. */
  error: Error
}

</script>

<XRButton
  {...$$restProps}
  mode='immersive-vr'
  sessionInit={{
    optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers']
  }}
  on:click
  on:error
/>
