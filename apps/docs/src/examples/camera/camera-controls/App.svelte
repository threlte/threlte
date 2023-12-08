<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { useTweakpane } from '$lib/useTweakpane'
  import { cameraControls, mesh } from './stores'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  let camera

  $: if ($cameraControls) {
    camera = $cameraControls._camera
  }

  const { action, addButton, addSeparator } = useTweakpane({
    title: 'Camera Controls',
    expanded: false
  })

  addButton({
    title: 'rotate theta 45deg',
    label: '',
    onClick: () => {
      $cameraControls.rotate(45 * DEG2RAD, 0, true)
    }
  })

  addButton({
    title: 'rotate theta -90deg',
    label: '',
    onClick: () => {
      $cameraControls.rotate(-90 * DEG2RAD, 0, true)
    }
  })
  addButton({
    title: 'rotate theta 360deg',
    label: '',
    onClick: () => {
      $cameraControls.rotate(360 * DEG2RAD, 0, true)
    }
  })
  addButton({
    title: 'rotate phi 20deg',
    label: '',
    onClick: () => {
      $cameraControls.rotate(0, 20 * DEG2RAD, true)
    }
  })

  addSeparator()

  addButton({
    title: 'truck(1, 0)',
    label: '',
    onClick: () => {
      $cameraControls.truck(1, 0, true)
    }
  })
  addButton({
    title: 'truck(0, 1)',
    label: '',
    onClick: () => {
      $cameraControls.truck(0, 1, true)
    }
  })
  addButton({
    title: 'truck(-1, -1)',
    label: '',
    onClick: () => {
      $cameraControls.truck(-1, -1, true)
    }
  })

  addSeparator()

  addButton({
    title: 'dolly 1',
    label: '',
    onClick: () => {
      $cameraControls.dolly(1, true)
    }
  })
  addButton({
    title: 'dolly -1',
    label: '',
    onClick: () => {
      $cameraControls.dolly(-1, true)
    }
  })

  addSeparator()

  addButton({
    title: 'zoom `camera.zoom / 2`',
    label: '',
    onClick: () => {
      $cameraControls.zoom(camera.zoom / 2, true)
    }
  })
  addButton({
    title: 'zoom `- camera.zoom / 2`',
    label: '',
    onClick: () => {
      $cameraControls.zoom(-camera.zoom / 2, true)
    }
  })

  addSeparator()

  addButton({
    title: 'move to ( 3, 5, 2)',
    label: '',
    onClick: () => {
      $cameraControls.moveTo(3, 5, 2, true)
    }
  })
  addButton({
    title: 'fit to the bounding box of the mesh',
    label: '',
    onClick: () => {
      $cameraControls.fitToBox($mesh, true)
    }
  })

  addSeparator()

  addButton({
    title: 'move to ( -5, 2, 1 )',
    label: '',
    onClick: () => {
      $cameraControls.setPosition(-5, 2, 1, true)
    }
  })
  addButton({
    title: 'look at ( 3, 0, -3 )',
    label: '',
    onClick: () => {
      $cameraControls.setTarget(3, 0, -3, true)
    }
  })
  addButton({
    title: 'move to ( 1, 2, 3 ), look at ( 1, 1, 0 )',
    label: '',
    onClick: () => {
      $cameraControls.setLookAt(1, 2, 3, 1, 1, 0, true)
    }
  })
  addSeparator()

  addButton({
    title: 'move to somewhere between ( -2, 0, 0 ) -> ( 1, 1, 0 ) and ( 0, 2, 5 ) -> ( -1, 0, 0 )',
    label: '',
    onClick: () => {
      $cameraControls.lerpLookAt(-2, 0, 0, 1, 1, 0, 0, 2, 5, -1, 0, 0, Math.random(), true)
    }
  })

  addSeparator()

  addButton({
    title: 'reset',
    label: '',
    onClick: () => {
      $cameraControls.reset(true)
    }
  })
  addButton({
    title: 'saveState',
    label: '',
    onClick: () => {
      $cameraControls.saveState()
    }
  })

  addSeparator()

  addButton({
    title: 'disable mouse/touch controls',
    label: '',
    onClick: () => {
      $cameraControls.enabled = false
    }
  })
  addButton({
    title: 'enable mouse/touch controls',
    label: '',
    onClick: () => {
      $cameraControls.enabled = true
    }
  })
</script>

<div use:action />

<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div {
    width: 100%;
    height: 100%;
  }
</style>
