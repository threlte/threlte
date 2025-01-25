<script lang="ts">
  import CameraControls from './CameraControls'
  import type CC from 'camera-controls'
  import type { ColorRepresentation } from 'three'
  import { Grid } from '@threlte/extras'
  import { Mesh, PerspectiveCamera } from 'three'
  import { T } from '@threlte/core'
  import { useTask, useThrelte } from '@threlte/core'

  let {
    color = '#ff3e00',
    controls = $bindable(),
    mesh = $bindable()
  }: {
    color?: ColorRepresentation
    controls: CC | undefined
    mesh?: Mesh
  } = $props()

  const { dom, invalidate } = useThrelte()

  const camera = new PerspectiveCamera()
  controls = new CameraControls(dom, camera)

  $effect(() => {
    return () => {
      controls.dispose()
    }
  })

  controls.setPosition(5, 5, 5)

  useTask(
    (delta) => {
      if (controls.update(delta)) {
        invalidate()
      }
    },
    { autoInvalidate: false }
  )
</script>

<T
  is={camera}
  makeDefault
/>

<T.Mesh
  oncreate={(ref) => {
    mesh = ref
  }}
  position.y={0.5}
>
  <T.BoxGeometry />
  <T.MeshBasicMaterial
    {color}
    wireframe
  />
</T.Mesh>

<Grid
  sectionColor={color}
  sectionThickness={1}
  cellColor="#cccccc"
  gridSize={40}
/>
