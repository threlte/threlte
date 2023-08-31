<script lang='ts' context='module'>
  import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
  import { T, useThrelte } from '@threlte/core'

  const controllerModelFactory = new XRControllerModelFactory()
</script>

<script lang='ts'>
  export let index: number
  const { xr } =  useThrelte().renderer
  const grip = xr.getControllerGrip(index)
  const controllerModel = controllerModelFactory.createControllerModel(grip)
</script>

<T is={controllerModel} name='XR Controller Model {index}' />
