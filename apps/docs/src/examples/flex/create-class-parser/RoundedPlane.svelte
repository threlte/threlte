<script lang="ts">
  import { T } from '@threlte/core'
  import { Shape, ShapeGeometry } from 'three'

  interface Props {
    color?: string
    height?: number
    width?: number
    radius?: number
    depth?: number
  }

  let { color = 'white', height = 1, width = 1, radius = 5, depth = 0 }: Props = $props()

  let x = 1
  let y = 1

  const createGeometry = (width: number, height: number, radius: number): ShapeGeometry => {
    let shape = new Shape()
    shape.moveTo(x, y + radius)
    shape.lineTo(x, y + height - radius)
    shape.quadraticCurveTo(x, y + height, x + radius, y + height)
    shape.lineTo(x + width - radius, y + height)
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
    shape.lineTo(x + width, y + radius)
    shape.quadraticCurveTo(x + width, y, x + width - radius, y)
    shape.lineTo(x + radius, y)
    shape.quadraticCurveTo(x, y, x, y + radius)

    const geometry = new ShapeGeometry(shape)
    geometry.center()
    return geometry
  }

  let geometry = $derived(createGeometry(width, height, radius))
</script>

<T.Mesh
  position.z={depth * 20}
  renderOrder={depth}
>
  <T is={geometry} />
  <T.MeshBasicMaterial {color} />
</T.Mesh>
