<script lang="ts">
  import { T, type Props } from '@threlte/core'
  import type { Mesh } from 'three'

  let { ...props }: Props<typeof Mesh> = $props()
</script>

<T.Mesh {...props}>
  <T.SphereGeometry args={[0.8]} />
  <T.MeshStandardMaterial color="#fe3d00" />
</T.Mesh>
