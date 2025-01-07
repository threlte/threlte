<script lang="ts">
  import { T, type Props } from '@threlte/core'
  import type { Mesh } from 'three'

  let { ...props }: Props<typeof Mesh> = $props()
</script>

<T.Mesh {...props}>
  <T.IcosahedronGeometry />
  <T.MeshStandardMaterial color="#fe3d00" />
</T.Mesh>
