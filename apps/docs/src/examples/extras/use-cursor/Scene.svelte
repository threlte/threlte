<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { interactivity, Text, Cursor } from '@threlte/extras'
  import { fromStore } from 'svelte/store'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  const cursor = new Cursor()

  const color = $derived(cursor.hovering ? '#dddddd' : '#fe3d00')

  const { size } = useThrelte()

  const sizeStore = fromStore(size)

  const zoom = $derived(sizeStore.current.width / 7)

  interactivity()
</script>

<T.OrthographicCamera
  {zoom}
  position={[5, 5, 5]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
  makeDefault
/>

<T.DirectionalLight
  position.y={10}
  position.x={5}
/>
<T.AmbientLight intensity={0.2} />

<T.Group
  onpointerenter={() => {
    cursor.hovering = true
  }}
  onpointerleave={() => {
    cursor.hovering = false
  }}
>
  <Text
    text="HOVER"
    interactive
    fontSize={0.5}
    anchorY="100%"
    anchorX="50%"
    rotation.y={90 * DEG2RAD}
    position.y={1}
    position.x={-1}
    {color}
  />

  <T.Mesh>
    <T.MeshStandardMaterial {color} />
    <T.BoxGeometry args={[2, 2, 2]} />
  </T.Mesh>
</T.Group>
