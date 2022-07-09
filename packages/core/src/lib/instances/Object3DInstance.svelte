<script lang="ts">
  import { useThrelte } from '../hooks/useThrelte'
  import SceneGraphObject from '../internal/SceneGraphObject.svelte'
  import LayerableObject from '../internal/LayerableObject.svelte'
  import TransformableObject from '../internal/TransformableObject.svelte'
  import ViewportAwareObject from '../internal/ViewportAwareObject.svelte'
  import type { Object3DInstanceProperties } from '../types/components'

  export let object: Object3DInstanceProperties['object']

  export let position: Object3DInstanceProperties['position'] = undefined
  export let scale: Object3DInstanceProperties['scale'] = undefined
  export let rotation: Object3DInstanceProperties['rotation'] = undefined
  export let lookAt: Object3DInstanceProperties['lookAt'] = undefined

  export let viewportAware: Object3DInstanceProperties['viewportAware'] = false
  export let inViewport: Object3DInstanceProperties['inViewport'] = false

  export let castShadow: Object3DInstanceProperties['castShadow'] = undefined
  export let receiveShadow: Object3DInstanceProperties['receiveShadow'] = undefined
  export let frustumCulled: Object3DInstanceProperties['frustumCulled'] = undefined
  export let renderOrder: Object3DInstanceProperties['renderOrder'] = undefined
  export let visible: Object3DInstanceProperties['visible'] = undefined

  const { invalidate } = useThrelte()
  const getObject = () => object

  $: {
    if (visible !== undefined) getObject().visible = visible
    if (castShadow !== undefined) getObject().castShadow = castShadow
    if (receiveShadow !== undefined) getObject().receiveShadow = receiveShadow
    if (frustumCulled !== undefined) getObject().frustumCulled = frustumCulled
    if (renderOrder !== undefined) getObject().renderOrder = renderOrder
    invalidate('Object3DInstance: props changed')
  }
</script>

<LayerableObject {object} />

<TransformableObject {object} {position} {rotation} {scale} {lookAt} />

<SceneGraphObject {object}>
  <slot />
</SceneGraphObject>

<ViewportAwareObject bind:inViewport {object} {viewportAware} on:viewportenter on:viewportleave />
