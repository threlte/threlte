<script lang="ts">
  import { T } from '@threlte/core'

  interface Props {
    color?: string
    radius?: number
    z?: number
  }

  let { color = 'white', radius = 5, z = 0 }: Props = $props()
</script>

<T.Mesh position.z={z}>
  <T.CircleGeometry args={[radius]} />
  <T.MeshBasicMaterial {color} />
</T.Mesh>
