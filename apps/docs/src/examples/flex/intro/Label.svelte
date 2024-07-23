<script lang="ts">
  import { Text } from '@threlte/extras'
  import type { ColorRepresentation } from 'three'
  import { useReflow } from '@threlte/flex'

  export let text: string
  export let color: ColorRepresentation = 'white'
  export let z = 0
  export let fontStyle:
    | 'black'
    | 'bold'
    | 'extra-bold'
    | 'extra-light'
    | 'light'
    | 'medium'
    | 'regular'
    | 'semi-bold'
    | 'thin' = 'regular'
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

  $: fontUrl = `/fonts/inter/inter-${fontStyle}.ttf`

  const reflow = useReflow()
</script>

<Text
  font={fontUrl}
  position.z={z}
  {text}
  {anchorX}
  {anchorY}
  fontSize={fontSizes[fontSize]}
  {color}
  onsync={reflow}
/>
