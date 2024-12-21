<script lang="ts">
  import { Environment, Hovering, Text, interactivity } from '@threlte/extras'
  import { T, useThrelte } from '@threlte/core'
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

  const hovering = Hovering.of(() => hoverStyle)

  const { size } = useThrelte()
  const sizeStore = fromStore(size)

  const zoom = $derived(sizeStore.current.width / 8)

  interactivity()
</script>

<T.OrthographicCamera
  {zoom}
  position.z={5}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
  makeDefault
/>

<Environment url="/textures/equirectangular/hdr/industrial_sunset_puresky_1k.hdr" />

<Text
  text={hoverStyle}
  fontSize={0.5}
  position.y={3}
  maxWidth={5}
  textAlign="center"
  anchorX="center"
/>

<Text
  text="click the box to cycle through all of the cursor styles"
  fontSize={0.5}
  position.y={-1}
  maxWidth={5}
  textAlign="center"
  anchorX="center"
/>

<T.Mesh
  scale={2}
  rotation.x={0.25 * Math.PI}
  rotation.y={0.25 * Math.PI}
  position.y={0.5}
  onclick={() => {
    index = (index + 1) % hoverStyles.length
  }}
  onpointerenter={() => {
    hovering.hover()
  }}
  onpointerleave={() => {
    hovering.unhover()
  }}
>
  <T.MeshStandardMaterial color="orangered" />
  <T.BoxGeometry />
</T.Mesh>
