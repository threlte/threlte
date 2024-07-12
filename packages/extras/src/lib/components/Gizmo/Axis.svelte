<script lang="ts">
  import { T } from '@threlte/core'
  import type { ColorRepresentation, Mesh } from 'three'
  import type { Props } from '@threlte/core'

  type AxisProps = Props<Mesh> & {
    opacity: number
    color: ColorRepresentation
    polygonOffset: boolean
  }

  let { opacity, color, polygonOffset, ...rest }: AxisProps = $props()
</script>

<T.Group {...rest}>
  <T.Mesh
    raycast={() => null}
    position.x={0.4}
  >
    <T.BoxGeometry args={[0.8, 0.035, 0.035]} />
    <T.MeshBasicMaterial
      transparent
      {opacity}
      {color}
      {polygonOffset}
      polygonOffsetFactor={-20}
    />
  </T.Mesh>
</T.Group>
