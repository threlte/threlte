<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { interactivity, Hovering, Text } from '@threlte/extras'
  import { fromStore } from 'svelte/store'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  const hovering = new Hovering()

  const color = $derived(hovering.current ? '#dddddd' : '#FE3D00')

  const { size } = useThrelte()

  const s = fromStore(size)
  const zoom = $derived(s.current.width / 7)

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
    hovering.current = true
  }}
  onpointerleave={() => {
    hovering.current = false
  }}
>
  <Text
    text="HOVER"
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
