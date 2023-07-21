<script lang='ts'>

import XRButton from './button.svelte'

type $$Events = {
  click: { state: 'unsupported' | 'insecure' | 'blocked' | 'supported' }
  error: Error
}

</script>

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
