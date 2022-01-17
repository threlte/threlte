<script lang="ts">
  import type { ColorRepresentation, Light } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import { convertColorRepresentationToColor } from '../lib/colors'
  import type { LookAtProp, PositionProp, RotationProp, ScaleProp } from '../types/types'
  import Object3DInstance from './Object3DInstance.svelte'

  export let light: Light

  // Object3DInstance
  export let position: PositionProp | undefined
  export let scale: ScaleProp | undefined
  export let rotation: RotationProp | undefined
  export let viewportAware: boolean
  export let inViewport: boolean
  export let castShadow: boolean
  export let receiveShadow: boolean
  export let frustumCulled: boolean
  export let renderOrder: number
  export let lookAt: LookAtProp | undefined

  // self
  export let color: ColorRepresentation
  export let intensity: number

  const { render } = useThrelte()
  const { linear } = useThrelteRoot()

  $: {
    light.intensity = intensity
    light.color = convertColorRepresentationToColor(color, linear)
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
