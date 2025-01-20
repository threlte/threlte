<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  import CC from 'camera-controls'
  import { Mesh, PerspectiveCamera } from 'three'
  import CameraControls from './CameraControls.svelte'

  const { dom } = useThrelte()

  type Props = {
    controls: CC
    mesh: Mesh
  }

  let { controls = $bindable(), mesh }: Props = $props()

  const camera = new PerspectiveCamera()
  controls = new CameraControls(camera, dom)
  controls.setPosition(5, 5, 5)
</script>

<T
  is={camera}
  makeDefault
/>

<T.DirectionalLight position={[3, 10, 7]} />

<T
  is={mesh}
  position.y={0.5}
>
  <T.BoxGeometry />
  <T.MeshBasicMaterial
    color="#ff3e00"
    wireframe
  />
</T>

<Grid
  sectionColor="#ff3e00"
  sectionThickness={1}
  cellColor={'#cccccc'}
  gridSize={40}
/>
