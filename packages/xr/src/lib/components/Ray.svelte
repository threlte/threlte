<script lang='ts'>
  import { T } from '@threlte/core'
  import { Line2 } from 'three/examples/jsm/lines/Line2.js'
  import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'

  export let positions: Float32Array | undefined
  export let color = 'white'

  let lineGeometry = new LineGeometry()

  $: if (positions) {
    lineGeometry.setPositions(positions)
  }
</script>

<T is={Line2}
  {...$$restProps}
  position.z={-0.01}
>
  <T is={lineGeometry} />
  <T is={LineMaterial}
    {color}
    linewidth={0.004}
  />
</T>