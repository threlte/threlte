<script lang="ts">
  import { HemisphereLight as ThreeHemisphereLight } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import LightInstance from '../instances/LightInstance.svelte'
  import { convertColorRepresentationToColor } from '../lib/colors'
  import type { HemisphereLightProps } from '../types/components'

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

  export const light = new ThreeHemisphereLight(skyColor, groundColor, intensity)

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
