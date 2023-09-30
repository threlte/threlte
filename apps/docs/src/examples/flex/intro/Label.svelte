<script lang="ts">
  import { Text } from '@threlte/extras'
  import type { ColorRepresentation } from 'three'

  export let text: string
  export let color: ColorRepresentation = 'white'
  export let z = 0
  export let fontStyle:
    | 'Black'
    | 'Bold'
    | 'ExtraBold'
    | 'ExtraLight'
    | 'Light'
    | 'Medium'
    | 'Regular'
    | 'SemiBold'
    | 'Thin' = 'Regular'
  export let anchorX = '50%'
  export let anchorY = '50%'
  export let fontSize: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm'

  const fontSizes: Record<typeof fontSize, number> = {
    xs: 4,
    s: 6,
    m: 8,
    l: 10,
    xl: 12
  }

  $: fontUrl = `/fonts/Inter-${fontStyle}.ttf`
</script>

<Text
  font={fontUrl}
  position.z={z}
  {text}
  {anchorX}
  {anchorY}
  fontSize={fontSizes[fontSize]}
  {color}
/>
