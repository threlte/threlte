<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { interactivity, Text, useCursor } from '@threlte/extras'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  const { hovering, onPointerEnter, onPointerLeave } = useCursor()

  $: color = $hovering ? '#dddddd' : '#FE3D00'

  const { size } = useThrelte()

  let zoom = $size.width / 7
  $: zoom = $size.width / 7

  interactivity()
</script>

<T.OrthographicCamera
  {zoom}
  position={[5, 5, 5]}
  oncreate={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
  makeDefault
/>

<T.DirectionalLight
  position.y={10}
  position.x={5}
/>
<T.AmbientLight intensity={0.2} />

<Text
  text="HOVER"
  interactive
  onpointerenter={onPointerEnter}
  onpointerleave={onPointerLeave}
  fontSize={0.5}
  anchorY="100%"
  anchorX="50%"
  rotation.y={90 * DEG2RAD}
  position.y={1}
  position.x={-1}
  {color}
/>

<T.Mesh
  onpointerenter={onPointerEnter}
  onpointerleave={onPointerLeave}
>
  <T.MeshStandardMaterial {color} />
  <T.BoxGeometry args={[2, 2, 2]} />
</T.Mesh>
