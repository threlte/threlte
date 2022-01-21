<script lang="ts">
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import { convertColorRepresentationToColor } from '../lib/colors'
  import type { LightInstanceProperties } from '../types/components'
  import Object3DInstance from './Object3DInstance.svelte'

  export let position: LightInstanceProperties['position']
  export let scale: LightInstanceProperties['scale']
  export let rotation: LightInstanceProperties['rotation']
  export let viewportAware: LightInstanceProperties['viewportAware']
  export let inViewport: LightInstanceProperties['inViewport']
  export let castShadow: LightInstanceProperties['castShadow']
  export let receiveShadow: LightInstanceProperties['receiveShadow']
  export let frustumCulled: LightInstanceProperties['frustumCulled']
  export let renderOrder: LightInstanceProperties['renderOrder']
  export let lookAt: LightInstanceProperties['lookAt']

  export let light: LightInstanceProperties['light']
  export let color: LightInstanceProperties['color']
  export let intensity: LightInstanceProperties['intensity']

  const { invalidate } = useThrelte()
  const { linear } = useThrelteRoot()

  $: {
    if (intensity !== undefined) light.intensity = intensity
    if (color !== undefined) light.color = convertColorRepresentationToColor(color, $linear)
    invalidate('LightInstance: props changed')
  }
</script>

<Object3DInstance
  object={light}
  {lookAt}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {position}
  {scale}
  {rotation}
  {viewportAware}
  on:viewportenter
  on:viewportleave
  bind:inViewport
>
  <slot />
</Object3DInstance>
