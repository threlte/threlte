<script lang="ts">
  import { HemisphereLight as ThreeHemisphereLight } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import LightInstance from '../instances/LightInstance.svelte'
  import { convertColorRepresentationToColor } from '../lib/colors'
  import type { HemisphereLightProperties } from '../types/components'

  export let position: HemisphereLightProperties['position'] = undefined
  export let scale: HemisphereLightProperties['scale'] = undefined
  export let rotation: HemisphereLightProperties['rotation'] = undefined
  export let lookAt: HemisphereLightProperties['lookAt'] = undefined
  export let castShadow: HemisphereLightProperties['castShadow'] = undefined
  export let receiveShadow: HemisphereLightProperties['receiveShadow'] = undefined
  export let viewportAware: HemisphereLightProperties['viewportAware'] = false
  export let inViewport: HemisphereLightProperties['inViewport'] = false
  export let frustumCulled: HemisphereLightProperties['frustumCulled'] = undefined
  export let renderOrder: HemisphereLightProperties['renderOrder'] = undefined
  export let intensity: HemisphereLightProperties['intensity'] = undefined
  export let skyColor: HemisphereLightProperties['skyColor'] = undefined
  export let groundColor: HemisphereLightProperties['groundColor'] = undefined

  export const light = new ThreeHemisphereLight(skyColor, groundColor, intensity)

  const { invalidate } = useThrelte()
  const { linear } = useThrelteRoot()

  $: {
    if (groundColor !== undefined) {
      light.groundColor = convertColorRepresentationToColor(groundColor, $linear)
      invalidate('HemisphereLight: props changed')
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
