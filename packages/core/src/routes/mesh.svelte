<script lang="ts">
  import { Mesh } from 'three'
  import { T, useTask } from '@threlte/core'

  let ref: Mesh

  useTask(() => {
    if (!ref) return
    ref.rotation.x += 0.01
    ref.rotation.y += 0.01
  })
</script>

<T.Mesh castShadow receiveShadow {...$$restProps} bind:ref>
  <T.MeshStandardMaterial color="hotpink" />
  <T.BoxGeometry />
</T.Mesh>
