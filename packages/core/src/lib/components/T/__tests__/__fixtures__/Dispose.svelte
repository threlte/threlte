<script lang="ts">
  import { T } from '@threlte/core'
  import type { MeshBasicMaterial, Mesh } from 'three'

  interface Props {
    is: Mesh | MeshBasicMaterial
  }

  let { is }: Props = $props()
</script>

<T.Mesh>
  <T {is} />
</T.Mesh>
