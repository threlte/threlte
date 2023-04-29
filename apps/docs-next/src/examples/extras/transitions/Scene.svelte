<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, createTransition, transitions } from '@threlte/extras'
  import { cubicOut } from 'svelte/easing'
  import type { Material, Mesh } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  export let showCube = true

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

<T.PerspectiveCamera
  position={[8, 5, 8]}
  makeDefault
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 15, 3]} />
<T.AmbientLight />

{#if showCube}
  <T.Mesh
    in={fly}
    out={scale}
    on:introstart={() => {
      console.log('introstart')
    }}
  >
    <T.BoxGeometry />
    <T.MeshStandardMaterial transition={fade} />
  </T.Mesh>
{/if}

<T.Mesh
  rotation.x={-90 * DEG2RAD}
  position.y={-0.5}
>
  <T.PlaneGeometry args={[4, 4]} />
  <T.MeshStandardMaterial />
</T.Mesh>
