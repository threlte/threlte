<script lang="ts">
  import { useThrelte } from '../hooks/useThrelte'
  import HierarchicalObject from '../internal/HierarchicalObject.svelte'
  import LayerableObject from '../internal/LayerableObject.svelte'
  import TransformableObject from '../internal/TransformableObject.svelte'
  import ViewportAwareObject from '../internal/ViewportAwareObject.svelte'
  import type { Object3DInstanceProperties } from '../types/components'

  export let object: Object3DInstanceProperties['object']

  // TransformableObject
  export let position: Object3DInstanceProperties['position']
  export let scale: Object3DInstanceProperties['scale']
  export let rotation: Object3DInstanceProperties['rotation']
  export let lookAt: Object3DInstanceProperties['lookAt']

  // ViewportAwareObject
  export let viewportAware: Object3DInstanceProperties['viewportAware']
  export let inViewport: Object3DInstanceProperties['inViewport']

  // self
  export let castShadow: Object3DInstanceProperties['castShadow']
  export let receiveShadow: Object3DInstanceProperties['receiveShadow']
  export let frustumCulled: Object3DInstanceProperties['frustumCulled']
  export let renderOrder: Object3DInstanceProperties['renderOrder']

  const { invalidate } = useThrelte()

  $: {
    if (castShadow !== undefined) object.castShadow = castShadow
    if (receiveShadow !== undefined) object.receiveShadow = receiveShadow
    if (frustumCulled !== undefined) object.frustumCulled = frustumCulled
    if (renderOrder !== undefined) object.renderOrder = renderOrder
    invalidate('Object3DInstance: props changed')
  }
</script>

<LayerableObject {object} />

<TransformableObject {object} {position} {rotation} {scale} {lookAt} />

<HierarchicalObject {object}>
  <slot />
</HierarchicalObject>

<ViewportAwareObject bind:inViewport {object} {viewportAware} on:viewportenter on:viewportleave />
