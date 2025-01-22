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
    controls = $bindable()
  }: {
    color?: ColorRepresentation
    controls: CC | undefined
  } = $props()

  const { autoRender, dom, invalidate } = useThrelte()

  const camera = new PerspectiveCamera()
  controls = new CameraControls(dom, camera)

  $effect(() => {
    return () => {
      controls.dispose()
    }
  })
  controls.setPosition(5, 5, 5)

  const last = autoRender.current
  autoRender.set(false)
  $effect(() => {
    return () => {
      autoRender.set(last)
    }
  })

  useTask(
    (delta) => {
      if (controls.update(delta)) {
        console.log('yo')
        invalidate()
      }
    },
    { autoInvalidate: false }
  )

  const mesh = new Mesh()

  export const fitToMesh = (transition = true) => {
    return controls.fitToBox(mesh, transition)
  }
</script>

<T
  is={camera}
  makeDefault
/>

<T
  is={mesh}
  position.y={0.5}
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
  cellColor="#cccccc"
  gridSize={40}
/>
