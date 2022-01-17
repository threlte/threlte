<script lang="ts">
  import type { Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import HierarchicalObject from '../internal/HierarchicalObject.svelte'
  import LayerableObject from '../internal/LayerableObject.svelte'
  import TransformableObject from '../internal/TransformableObject.svelte'
  import ViewportAwareObject from '../internal/ViewportAwareObject.svelte'
  import type { LookAtProp, PositionProp, RotationProp, ScaleProp } from '../types/types'

  export let object: Object3D

  // TransformableObject
  export let position: PositionProp | undefined
  export let scale: ScaleProp | undefined
  export let rotation: RotationProp | undefined

  // ViewportAwareObject
  export let viewportAware: boolean
  export let inViewport: boolean

  export let lookAt: LookAtProp | undefined

  // self
  export let castShadow: boolean
  export let receiveShadow: boolean
  export let frustumCulled: boolean
  export let renderOrder: number

  const { render } = useThrelte()

  $: {
    object.castShadow = castShadow
    object.receiveShadow = receiveShadow
    object.frustumCulled = frustumCulled
    object.renderOrder = renderOrder
    render('Object3DInstance: props changed')
  }
</script>

<LayerableObject {object} />

<TransformableObject {object} {position} {rotation} {scale} {lookAt} />

<HierarchicalObject {object}>
  <slot />
</HierarchicalObject>

{#if viewportAware}
  <ViewportAwareObject bind:inViewport {object} on:viewportenter on:viewportleave />
{/if}
