<script lang="ts">
  import { T, useDisposal, useTask } from '@threlte/core'
  import type { MeshBasicMaterial, Mesh } from 'three'

  interface Props {
    is: Mesh | MeshBasicMaterial
  }

  let { is }: Props = $props()

  const { dispose } = useDisposal()

  // This simulates the default animation loop calling dispose
  useTask(() => dispose())
</script>

<T.Mesh>
  <T {is} />
</T.Mesh>
