<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { Hovering, Text, interactivity } from '@threlte/extras'
  import { fromStore } from 'svelte/store'

  const hoverStyles = [
    'alias',
    'all-scroll',
    'auto',
    'cell',
    'context-menu',
    'col-resize',
    'copy',
    'crosshair',
    'default',
    'e-resize',
    'ew-resize',
    'grab',
    'grabbing',
    'help',
    'move',
    'n-resize',
    'ne-resize',
    'nesw-resize',
    'ns-resize',
    'nw-resize',
    'nwse-resize',
    'no-drop',
    'none',
    'not-allowed',
    'pointer',
    'progress',
    'row-resize',
    's-resize',
    'se-resize',
    'sw-resize',
    'text',
    'w-resize',
    'wait',
    'zoom-in',
    'zoom-out'
  ]
  let index = $state(0)

  const hoverStyle = $derived(hoverStyles[index] ?? 'pointer')

  const hovering = new Hovering(() => hoverStyle)

  const { size } = useThrelte()

  const s = fromStore(size)
  const zoom = $derived(s.current.width / 8)

  const color = 'orangered'

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

<T.Mesh
  onclick={() => {
    index = (index + 1) % hoverStyles.length
  }}
  onpointerenter={() => {
    hovering.current = true
  }}
  onpointerleave={() => {
    hovering.current = false
  }}
>
  <T.MeshStandardMaterial {color} />
  <T.BoxGeometry args={[2, 2, 2]} />
</T.Mesh>

<Text
  rotation.y={0.25 * Math.PI}
  position.y={4}
  text="click the box to cycle through all of the cursor styles"
  fontSize={0.5}
  anchorX="center"
  textAlign="center"
  maxWidth={5}
  {color}
/>

<Text
  rotation.y={0.25 * Math.PI}
  position.y={-2}
  text={hoverStyle}
  fontSize={0.5}
  anchorX="center"
  textAlign="center"
  maxWidth={5}
  {color}
/>
