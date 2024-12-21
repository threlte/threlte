<script lang="ts">
  import CC from 'camera-controls'
  import CameraControls from './CameraControls.svelte'
  import { Grid } from '@threlte/extras'
  import { Mesh, PerspectiveCamera } from 'three'
  import { isInstanceOf, T, useTask, useThrelte } from '@threlte/core'
  import { fromStore } from 'svelte/store'

  const { camera: defaultCamera, dom, invalidate } = useThrelte()

  type Props = {
    controls: CC
    mesh: Mesh
  }

  let { controls = $bindable(), mesh }: Props = $props()

  // controls can be attached and detached to different dom elements
  const element = $state(dom)

  const currentCamera = fromStore(defaultCamera).current
  const camera =
    isInstanceOf(currentCamera, 'PerspectiveCamera') ||
    isInstanceOf(currentCamera, 'OrthographicCamera')
      ? currentCamera
      : new PerspectiveCamera()
  camera.position.set(5, 5, 5)

  // note that `camera` is not reactive
  // `controls.camera = camera` doesn't do all the stuff that happens in the constructor.
  controls = new CameraControls(camera, () => element).controls

  const color = '#ff3e00'

  useTask(
    (delta) => {
      if (controls.update(delta)) {
        invalidate()
      }
    },
    { autoInvalidate: false }
  )

  const y = 0.5
</script>

<T.DirectionalLight position={[3, 10, 7]} />

<T
  is={mesh}
  position.y={y}
>
  <T.BoxGeometry />
  <T.MeshBasicMaterial
    {color}
    wireframe
  />
</T>

<Grid
  sectionColor={color}
  sectionThickness={1}
  cellColor={'#cccccc'}
  gridSize={40}
/>
