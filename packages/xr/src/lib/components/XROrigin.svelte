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

  const { camera, scene } = useThrelte()

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

  // Parent the active scene camera to this group so its `parent.matrixWorld`
  // reflects our transform. Three's `WebXRManager` reads `camera.parent` (where
  // `camera` is the camera passed to `renderer.render(scene, camera)`) — NOT
  // `renderer.xr.getCamera().parent` — when composing the XR view matrices, so
  // reparenting the XR camera itself has no effect. When this component
  // unmounts (or the active camera changes) the camera returns to its previous
  // parent so non-XR rendering keeps working.
  $effect.pre(() => {
    if (!isPresenting.current) return

    const userCamera = $camera
    const previousParent = userCamera.parent ?? scene
    group.add(userCamera)

    return () => {
      previousParent.add(userCamera)
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
