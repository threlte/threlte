<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  import { BufferAttribute } from 'three'

  type Props = {
    center: [number, number, number]
  }

  let { center }: Props = $props()

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
  <T.BoxGeometry
    oncreate={(ref) => {
      ref.setAttribute('color', new BufferAttribute(colors, 3))
    }}
  />
  <T.MeshBasicMaterial vertexColors />
</T.Mesh>
