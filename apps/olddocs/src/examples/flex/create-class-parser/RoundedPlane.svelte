<script lang="ts">
  import { T } from '@threlte/core'
  import { Shape, ShapeGeometry } from 'three'

  export let color: string = 'white'
  export let height = 1
  export let width = 1
  export let radius = 5
  export let depth = 0

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

  $: geometry = createGeometry(width, height, radius)
</script>

<T.Mesh
  position.z={depth * 20}
  renderOrder={depth}
>
  <T is={geometry} />
  <T.MeshBasicMaterial {color} />
</T.Mesh>
