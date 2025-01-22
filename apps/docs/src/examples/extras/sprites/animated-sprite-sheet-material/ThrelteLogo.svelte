<script lang="ts">
  import { T } from '@threlte/core'
  import { SpriteSheetMaterial } from '@threlte/extras'

  interface Props {
    show: boolean
  }

  let { show }: Props = $props()

  let animation: 'Hidden' | 'In' | 'Out' = $state('Hidden')
  let mounted = false

  $effect(() => {
    if (mounted && show) {
      animation = 'In'
    } else if (!show && animation === 'In') {
      animation = 'Out'
    } else {
      mounted = true
    }
  })
</script>

<T.Sprite
  scale={[3.5, 1.75, 3.5]}
  position.y={0.2}
>
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/Threlte_7.png"
    dataUrl="/textures/sprites/Threlte_7.json"
    dataFormat="Aseprite"
    animate
    {animation}
    loop={false}
  />
</T.Sprite>
