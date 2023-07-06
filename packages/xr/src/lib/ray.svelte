<script lang='ts' context='module'>

import { T, extend } from '@threlte/core'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

extend({ Line2, LineGeometry, LineMaterial })

</script>

<script lang='ts'>

export let positions = new Float32Array([0, 0, 0, 0, 0, -0.3])
export let colors: Float32Array | undefined = undefined
export let length = 1
export let color = 'white'
export let transparent = false

const lineGeometry = new LineGeometry()

$: lineGeometry.setPositions(positions)

$: if (colors !== undefined) {
  lineGeometry.setColors(colors)
}

</script>

<T.Line2
  {...$$restProps}
  scale.z={length}
  position.z={-0.01}
>
  <T is={lineGeometry} />
  <T.LineMaterial
    {color}
    {transparent}
    vertexColors={colors !== undefined}
    linewidth={0.004}
  />
</T.Line2>
