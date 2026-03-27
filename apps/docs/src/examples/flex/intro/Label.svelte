<script lang="ts">
  import { Text } from '@threlte/extras'
  import type { ColorRepresentation } from 'three'
  import { useReflow } from '@threlte/flex'

  interface Props {
    text: string
    color?: ColorRepresentation
    z?: number
    fontStyle?:
      | 'black'
      | 'bold'
      | 'extra-bold'
      | 'extra-light'
      | 'light'
      | 'medium'
      | 'regular'
      | 'semi-bold'
      | 'thin'
    anchorX?: string
    anchorY?: string
    fontSize?: 'xs' | 's' | 'm' | 'l' | 'xl'
  }

  let {
    text,
    color = 'white',
    z = 0,
    fontStyle = 'regular',
    anchorX = '50%',
    anchorY = '50%',
    fontSize = 'm'
  }: Props = $props()

  const fontSizes: Record<typeof fontSize, number> = {
    xs: 4,
    s: 6,
    m: 8,
    l: 10,
    xl: 12
  }

  let fontUrl = $derived(`/fonts/inter/inter-${fontStyle}.ttf`)

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
