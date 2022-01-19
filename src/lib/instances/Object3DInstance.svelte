<script lang="ts">
  import { useThrelte } from '../hooks/useThrelte'
  import HierarchicalObject from '../internal/HierarchicalObject.svelte'
  import LayerableObject from '../internal/LayerableObject.svelte'
  import TransformableObject from '../internal/TransformableObject.svelte'
  import ViewportAwareObject from '../internal/ViewportAwareObject.svelte'
  import type { Object3DInstanceProps } from '../types/components'

  export let object: Object3DInstanceProps['object']

  // TransformableObject
  export let position: Object3DInstanceProps['position']
  export let scale: Object3DInstanceProps['scale']
  export let rotation: Object3DInstanceProps['rotation']
  export let lookAt: Object3DInstanceProps['lookAt']

  // ViewportAwareObject
  export let viewportAware: Object3DInstanceProps['viewportAware']
  export let inViewport: Object3DInstanceProps['inViewport']

  // self
  export let castShadow: Object3DInstanceProps['castShadow']
  export let receiveShadow: Object3DInstanceProps['receiveShadow']
  export let frustumCulled: Object3DInstanceProps['frustumCulled']
  export let renderOrder: Object3DInstanceProps['renderOrder']

  const { render } = useThrelte()

  $: {
    if (castShadow !== undefined) object.castShadow = castShadow
    if (receiveShadow !== undefined) object.receiveShadow = receiveShadow
    if (frustumCulled !== undefined) object.frustumCulled = frustumCulled
    if (renderOrder !== undefined) object.renderOrder = renderOrder
    render('Object3DInstance: props changed')
  }
</script>

<LayerableObject {object} />

<TransformableObject {object} {position} {rotation} {scale} {lookAt} />

<HierarchicalObject {object}>
  <slot />
</HierarchicalObject>

<ViewportAwareObject bind:inViewport {object} {viewportAware} on:viewportenter on:viewportleave />
