<script lang="ts">
  import { T } from '@threlte/core'

  interface Props {
    color?: string
    height?: number
    width?: number
    depth?: number
  }

  let { color = 'white', height = 1, width = 1, depth = 0 }: Props = $props()
</script>

<T.Mesh
  position.z={depth * 20}
  renderOrder={depth}
>
  <T.PlaneGeometry args={[width, height]} />
  <T.MeshBasicMaterial
    {color}
    transparent
    opacity={0.5}
  />
</T.Mesh>
