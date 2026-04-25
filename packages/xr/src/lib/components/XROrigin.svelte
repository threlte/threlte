<!--
@component `<XROrigin />` represents the position of the XR user's feet. The XR
camera (headset) is parented to this group, and any `<Controller>` / `<Hand>`
components nested inside attach here instead of the scene root. Transforming
the origin (position, rotation, scale) transforms the user in the scene —
useful for teleportation, dolly rigs, and resizing the user.

Only one `<XROrigin>` may be mounted within a given `<XR>`.

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
  import { T, useThrelte, type Props } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { useXROrigin } from '../hooks/useXROrigin.svelte.js'
  import { isPresenting } from '../internal/state.svelte.js'

  interface XROriginProps extends Props<Group> {
    ref?: Group
    children?: Snippet<[{ ref: Group }]>
  }

  let { ref = $bindable(), children, ...rest }: XROriginProps = $props()

  const { renderer, scene } = useThrelte()

  const group = new Group()
  const origin = useXROrigin()

  $effect.pre(() => {
    if (origin.current !== undefined && origin.current !== group) {
      console.warn(
        'Only one <XROrigin> may be mounted within a single <XR>. The newer instance will take over.'
      )
    }

    origin.current = group
    return () => {
      if (origin.current === group) {
        origin.current = undefined
      }
    }
  })

  // Parent the XR camera to this group so its matrixWorld reflects our
  // transform. When this component unmounts (or the session ends), return the
  // camera to the scene root so non-XR rendering keeps working.
  $effect.pre(() => {
    if (!isPresenting.current) return

    const camera = renderer.xr.getCamera()
    const previousParent = camera.parent ?? scene
    group.add(camera)

    return () => {
      previousParent.add(camera)
    }
  })
</script>

<T
  is={group}
  bind:ref
  {...rest}
>
  {@render children?.({ ref: group })}
</T>
