<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { AnimatedSpriteMaterial } from '@threlte/extras'
  import { PointLight } from 'three'

  const light = new PointLight('#FF893D', 100)

  let rate = 1 / 10
  let fixedStepTimeAccumulator = 0
  useTask((delta) => {
    fixedStepTimeAccumulator += delta
    while (fixedStepTimeAccumulator >= rate) {
      fixedStepTimeAccumulator -= rate
      // random light intensity between 22 and 44
      light.intensity = Math.random() * 24 + 22
    }
  })
</script>

<T.Sprite position.y={-2.3}>
  <AnimatedSpriteMaterial
    textureUrl="/textures/sprites/fire.png"
    totalFrames={8}
    fps={10}
  />
  <T
    is={light}
    distance={1.8}
    decay={0.5}
    position.y={-0.2}
    position.z={0.02}
  />
</T.Sprite>
