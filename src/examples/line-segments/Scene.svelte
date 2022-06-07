<script lang="ts">
  import { BoxBufferGeometry, EdgesGeometry, LineBasicMaterial } from 'three'
  import { LineSegments, OrbitControls, PerspectiveCamera } from 'threlte'

  const material = new LineBasicMaterial({
    color: 0x0000ff
  })

  const linesGeometry = new EdgesGeometry(new BoxBufferGeometry(1, 1, 1), 15)
</script>

<PerspectiveCamera position={{ y: 10, x: 10, z: 10 }}>
  <OrbitControls />
</PerspectiveCamera>

<LineSegments geometry={linesGeometry} {material} />
