<!--
@component `<XROrigin />` represents the position of the XR user's feet. The XR
camera (headset) is parented to this group, and any `<Controller>` / `<Hand>`
components nested inside attach here instead of the scene root. Transforming
the origin (position, rotation, scale) transforms the user in the scene —
useful for teleportation, dolly rigs, and resizing the user.

```svelte
<XROrigin position={[0, 0, 5]} rotation.y={Math.PI}>
  <Controller left />
  <Controller right />
  <Hand left />
  <Hand right />
</XROrigin>
```

Without an `<XROrigin>`, controllers and hands continue to attach to the
scene root (existing behaviour, unchanged).
-->
<script lang="ts">
  import { Group } from 'three'
  import { T, useThrelte } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { provideXROrigin } from '../hooks/useXROrigin.svelte.js'
  import { isPresenting } from '../internal/state.svelte.js'

  interface Props {
    ref?: Group
    children?: Snippet<[{ ref: Group }]>
    [key: string]: unknown
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const { renderer, scene } = useThrelte()

  const group = new Group()
  provideXROrigin(() => group)

  // Parent the XR camera to this group so its matrixWorld reflects our
  // transform. When this component unmounts (or the session ends), return the
  // camera to the scene root so non-XR rendering keeps working.
  $effect.pre(() => {
    if (!isPresenting.current) return

    const camera = renderer.xr.getCamera()
    group.add(camera)

    return () => {
      scene.add(camera)
    }
  })
</script>

<T
  is={group}
  bind:ref
  attach={scene}
  {...rest}
>
  {@render children?.({ ref: group })}
</T>
