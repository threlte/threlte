<script lang="ts">
  import { T } from '@threlte/core'
  import { createTransition } from '@threlte/extras'
  import { cubicOut } from 'svelte/easing'
  import type { Material, Mesh } from 'three'

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

<T.Mesh
  in={fly}
  out={scale}
>
  <T.BoxGeometry />
  <T.MeshStandardMaterial
    color="#A854F7"
    transition={fade}
  />
</T.Mesh>
