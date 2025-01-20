<script lang="ts">
  import { T, type Props } from '@threlte/core'
  import { RoundedBoxGeometry } from '@threlte/extras'
  import type { Mesh } from 'three'

  let { ...props }: Props<typeof Mesh> = $props()
</script>

<T.Mesh {...props}>
  <RoundedBoxGeometry
    radius={0.2}
    args={[1.3, 1.3, 1.3]}
  />
  <T.MeshStandardMaterial color="#fe3d00" />
</T.Mesh>
