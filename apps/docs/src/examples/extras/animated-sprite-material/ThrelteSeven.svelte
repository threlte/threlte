<script lang="ts">
  import { T } from '@threlte/core'
  import { AnimatedSpriteMaterial } from '@threlte/extras'

  export let show: boolean

  let animation: 'Hidden' | 'In' | 'Out' = 'Hidden'
  $: if (show) {
    animation = 'In'
  } else if (!show && animation === 'In') {
    animation = 'Out'
  }
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
