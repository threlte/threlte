<script lang="ts">
  import type { Vector2Tuple } from 'three'
  import { Grid, interactivity, OrbitControls, useCursor } from '@threlte/extras'
  import { Spring } from 'svelte/motion'
  import { T } from '@threlte/core'

  interactivity()

  const boxPosition = new Spring<Vector2Tuple>([0, 0])
  const random = () => 10 * Math.random() - 5
  const scale = new Spring(1)
  const boxSize = 1
  const positionY = $derived(0.5 * boxSize * scale.current)

  const { onPointerEnter, onPointerLeave } = useCursor()

  const notHoveringColor = '#ffffff'
  const hoveringColor = '#fe3d00'
  let color = $state(notHoveringColor)
</script>

<T.OrthographicCamera
  zoom={80}
  position={10}
  makeDefault
>
  <OrbitControls />
</T.OrthographicCamera>

<T.AmbientLight intensity={0.4} />
<T.DirectionalLight position={[1, 2, 5]} />

<T.Mesh
  onclick={() => {
    boxPosition.target = [random(), random()]
  }}
  onpointerenter={() => {
    onPointerEnter()
    scale.target = 2
    color = hoveringColor
  }}
  onpointerleave={() => {
    onPointerLeave()
    scale.target = 1
    color = notHoveringColor
  }}
  scale={scale.current}
  position.x={boxPosition.current[0]}
  position.y={positionY}
  position.z={boxPosition.current[1]}
>
  <T.BoxGeometry args={[boxSize, boxSize, boxSize]} />
  <T.MeshStandardMaterial {color} />
</T.Mesh>

<Grid
  position.y={-1 * 0.5}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={25}
  cellSize={2}
/>
