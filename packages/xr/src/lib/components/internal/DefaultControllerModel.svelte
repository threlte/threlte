<script module>
  import { T, useThrelte } from '@threlte/core'
  import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'
</script>

<script lang="ts">
  interface Props {
    handedness: 'left' | 'right'
  }

  let { handedness }: Props = $props()

  const { renderer } = useThrelte()

  const factory = new XRControllerModelFactory()
  const index = $derived(handedness === 'left' ? 0 : 1)
  const targetRay = $derived(renderer.xr.getController(index))
  const model = $derived(factory.createControllerModel(targetRay))
</script>

<T
  is={model}
  dispose={false}
/>
