<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Transition, transitions } from '@threlte/extras'
  import type { MeshBasicMaterial } from 'three'

  let show = true

  transitions()

  const fade: Transition<MeshBasicMaterial> = (ref, { invalidate }) => {
    return {
      tick(t) {
        ref.opacity = t
        invalidate()
      },
      duration: 2e3
    }
  }
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
  <T.Mesh>
    <T.BoxGeometry />
    <T.MeshBasicMaterial
      transparent
      out={fade}
    />
  </T.Mesh>
{/if}
