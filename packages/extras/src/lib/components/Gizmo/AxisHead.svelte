<script lang="ts">
  import { T, type Props } from '@threlte/core'
  import { TextureLoader, type ColorRepresentation, type Sprite } from 'three'
  import { createTextureUrl } from './createSpriteTextureCanvas'

  const loader = new TextureLoader()

  type AxisHeadProps = Props<Sprite> & {
    opacity: number
    color: ColorRepresentation
    label?: string
  }

  let { opacity, color, label, ...rest }: AxisHeadProps = $props()
</script>

{#await loader.loadAsync(createTextureUrl(color, label)) then map}
  <T.Sprite
    renderOrder={1}
    {...rest}
  >
    <T.SpriteMaterial
      {opacity}
      {map}
    />
  </T.Sprite>
{/await}
