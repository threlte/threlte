<script lang="ts">
  import { T } from '@threlte/core'
  import { PlaneGeometry } from 'three'
  import type { BackdropGeometryProps } from './types.js'

  let { length = 1, segments = 20, ...rest }: BackdropGeometryProps = $props()

  const easeInExpo = (x: number): number => {
    return +(x !== 0) * 2 ** (10 * x - 10)
  }

  const geometry = $derived.by(() => {
    const geometry = new PlaneGeometry(1, 1, segments, segments)
    const position = geometry.getAttribute('position')
    const s = segments + 1
    const offset = 0.5

    let i = 0

    for (let x = 0; x < s; x += 1) {
      for (let y = 0; y < s; y += 1) {
        const xOverSegments = x / segments
        position.setXYZ(
          i,
          xOverSegments - offset + +(x === 0) * -1 * length,
          y / segments - offset,
          easeInExpo(xOverSegments)
        )
        i += 1
      }
    }
    position.needsUpdate = true

    geometry.computeVertexNormals()

    geometry.rotateZ(0.5 * Math.PI)
    geometry.rotateX(-0.5 * Math.PI)

    return geometry
  })
</script>

<T
  is={geometry}
  {...rest}
/>
