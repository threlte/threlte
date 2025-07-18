<script lang="ts">
  import { T } from '@threlte/core'
  import { AnimatedSpriteMaterial } from '@threlte/extras'

  interface Props {
    show: boolean
  }

  let { show }: Props = $props()

  let animation = $state<'Hidden' | 'In' | 'Out'>('Hidden')
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
  <AnimatedSpriteMaterial
    textureUrl="/textures/sprites/Threlte_7.png"
    dataUrl="/textures/sprites/Threlte_7.json"
    {animation}
    autoplay
    loop={false}
  />
</T.Sprite>
