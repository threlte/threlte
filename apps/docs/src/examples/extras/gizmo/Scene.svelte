<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid } from '@threlte/extras'

  export let center: [number, number, number]

  const red = [1, 0, 0]
  const green = [0, 1, 0]
  const blue = [0, 0, 1]

  const colors = new Float32Array([
    ...red,
    ...red,
    ...red,
    ...red,
    ...red,
    ...red,
    ...red,
    ...red,
    ...green,
    ...green,
    ...green,
    ...green,
    ...green,
    ...green,
    ...green,
    ...green,
    ...blue,
    ...blue,
    ...blue,
    ...blue,
    ...blue,
    ...blue,
    ...blue,
    ...blue
  ])
</script>

<T.AxesHelper
  args={[5]}
  renderOrder={1}
/>

<Grid
  sectionSize={0}
  cellColor="#eee"
/>

<T.Mesh position={center}>
  <T.BoxGeometry>
    <T.BufferAttribute
      args={[colors, 3]}
      attach={(parent, self) => {
        parent.setAttribute('color', self)
      }}
    />
  </T.BoxGeometry>
  <T.MeshBasicMaterial vertexColors />
</T.Mesh>
