<script lang='ts' context='module'>

import { T, extend } from '@threlte/core'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

extend({ Line2, LineGeometry, LineMaterial })

</script>

<script lang='ts'>

export let positions: Float32Array | undefined
export let color = 'white'

let lineGeometry = new LineGeometry()

$: if (positions) {
  lineGeometry.setPositions(positions)
}

</script>

<T.Line2
  {...$$restProps}
  position.z={-0.01}
>
  <T is={lineGeometry} />
  <T.LineMaterial
    {color}
    linewidth={0.004}
  />
</T.Line2>
