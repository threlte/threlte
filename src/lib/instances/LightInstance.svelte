<script lang="ts">
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import { convertColorRepresentationToColor } from '../lib/colors'
  import type { LightInstanceProperties } from '../types/components'
  import Object3DInstance from './Object3DInstance.svelte'

  export let light: LightInstanceProperties['light']

  export let position: LightInstanceProperties['position'] = undefined
  export let scale: LightInstanceProperties['scale'] = undefined
  export let rotation: LightInstanceProperties['rotation'] = undefined
  export let lookAt: LightInstanceProperties['lookAt'] = undefined
  export let viewportAware: LightInstanceProperties['viewportAware'] = false
  export let inViewport: LightInstanceProperties['inViewport'] = false
  export let castShadow: LightInstanceProperties['castShadow'] = undefined
  export let receiveShadow: LightInstanceProperties['receiveShadow'] = undefined
  export let frustumCulled: LightInstanceProperties['frustumCulled'] = undefined
  export let renderOrder: LightInstanceProperties['renderOrder'] = undefined
  export let visible: LightInstanceProperties['visible'] = undefined

  export let color: LightInstanceProperties['color'] = undefined
  export let intensity: LightInstanceProperties['intensity'] = undefined

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
  {visible}
  on:viewportenter
  on:viewportleave
  bind:inViewport
>
  <slot />
</Object3DInstance>
