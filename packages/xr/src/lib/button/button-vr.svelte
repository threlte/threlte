<script lang='ts'>

import { createEventDispatcher } from 'svelte'
import XRButton from './button.svelte'

type $$Events = {
  click: { state: 'unsupported' | 'insecure' | 'blocked' | 'supported' }
  error: unknown
}

const dispatch = createEventDispatcher<$$Events>()

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
  on:click={(event) => dispatch('click', event.detail)}
  on:error={(event) => dispatch('error', event.detail)}
/>
