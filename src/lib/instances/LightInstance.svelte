<script lang="ts">
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import { convertColorRepresentationToColor } from '../lib/colors'
  import type { LightInstanceProps } from '../types/components'
  import Object3DInstance from './Object3DInstance.svelte'

  export let position: LightInstanceProps['position']
  export let scale: LightInstanceProps['scale']
  export let rotation: LightInstanceProps['rotation']
  export let viewportAware: LightInstanceProps['viewportAware']
  export let inViewport: LightInstanceProps['inViewport']
  export let castShadow: LightInstanceProps['castShadow']
  export let receiveShadow: LightInstanceProps['receiveShadow']
  export let frustumCulled: LightInstanceProps['frustumCulled']
  export let renderOrder: LightInstanceProps['renderOrder']
  export let lookAt: LightInstanceProps['lookAt']

  export let light: LightInstanceProps['light']
  export let color: LightInstanceProps['color']
  export let intensity: LightInstanceProps['intensity']

  const { render } = useThrelte()
  const { linear } = useThrelteRoot()

  $: {
    if (intensity !== undefined) light.intensity = intensity
    if (color !== undefined) light.color = convertColorRepresentationToColor(color, linear)
    render('LightInstance: props changed')
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
