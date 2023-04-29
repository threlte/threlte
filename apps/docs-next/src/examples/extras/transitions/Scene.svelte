<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, createTransition, transitions } from '@threlte/extras'
  import { cubicOut } from 'svelte/easing'
  import type { Material, Mesh } from 'three'

  let show = true

  transitions()

  const fade = createTransition<Material>((ref) => {
    if (!ref.transparent) ref.transparent = true
    return {
      tick(t) {
        ref.opacity = t
      },
      easing: cubicOut,
      duration: 400
    }
  })

  const scale = createTransition<Mesh>((ref) => {
    return {
      tick(t) {
        // t is [0,1] and needs to be converted to [0.5,1]
        t = 0.5 + t * 0.5
        ref.scale.set(t, t, t)
      },
      easing: cubicOut,
      duration: 400
    }
  })

  const fly = createTransition<Mesh>((ref) => {
    return {
      tick(t) {
        // t is [0,1] and needs to be converted to [1,0]
        t = 1 - t
        ref.position.y = t
      },
      easing: cubicOut,
      duration: 400
    }
  })
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'e') show = !show
  }}
/>

<T.PerspectiveCamera
  position={[0, 5, 10]}
  makeDefault
>
  <OrbitControls />
</T.PerspectiveCamera>

{#if show}
  <T.Mesh
    in={fly}
    out={scale}
  >
    <T.BoxGeometry />
    <T.MeshBasicMaterial transition={fade} />
  </T.Mesh>
{/if}
