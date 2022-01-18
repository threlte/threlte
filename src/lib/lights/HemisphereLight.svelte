<script lang="ts" context="module">
  export type HemisphereLightProps = {
    position: LightInstanceProps['position']
    scale: LightInstanceProps['scale']
    rotation: LightInstanceProps['rotation']
    lookAt: LightInstanceProps['lookAt']
    castShadow: LightInstanceProps['castShadow']
    receiveShadow: LightInstanceProps['receiveShadow']
    viewportAware: LightInstanceProps['viewportAware']
    inViewport: LightInstanceProps['inViewport']
    frustumCulled: LightInstanceProps['frustumCulled']
    renderOrder: LightInstanceProps['renderOrder']
    intensity: LightInstanceProps['intensity']
    skyColor: LightInstanceProps['color']
    groundColor: ColorRepresentation | undefined
  }
</script>

<script lang="ts">
  import { ColorRepresentation, HemisphereLight } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { LightInstanceProps } from '../instances/LightInstance.svelte'
  import LightInstance from '../instances/LightInstance.svelte'
  import { convertColorRepresentationToColor } from '../lib/colors'

  export let position: HemisphereLightProps['position'] = undefined
  export let scale: HemisphereLightProps['scale'] = undefined
  export let rotation: HemisphereLightProps['rotation'] = undefined
  export let lookAt: HemisphereLightProps['lookAt'] = undefined
  export let castShadow: HemisphereLightProps['castShadow'] = undefined
  export let receiveShadow: HemisphereLightProps['receiveShadow'] = undefined
  export let viewportAware: HemisphereLightProps['viewportAware'] = false
  export let inViewport: HemisphereLightProps['inViewport'] = false
  export let frustumCulled: HemisphereLightProps['frustumCulled'] = undefined
  export let renderOrder: HemisphereLightProps['renderOrder'] = undefined
  export let intensity: HemisphereLightProps['intensity'] = undefined
  export let skyColor: HemisphereLightProps['skyColor'] = undefined
  export let groundColor: HemisphereLightProps['groundColor'] = undefined

  export const light = new HemisphereLight(skyColor, groundColor, intensity)

  const { render } = useThrelte()
  const { linear } = useThrelteRoot()

  $: {
    if (groundColor !== undefined) {
      light.groundColor = convertColorRepresentationToColor(groundColor, linear)
      render('HemisphereLight: props changed')
    }
  }
</script>

<LightInstance
  {light}
  {lookAt}
  {position}
  {scale}
  {rotation}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
  color={skyColor}
  {intensity}
>
  <slot />
</LightInstance>
