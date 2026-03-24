<script lang="ts">
  import { MathUtils } from 'three'
  import { T } from '@threlte/core'
  import { Edges } from '@threlte/extras'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { Tween } from 'svelte/motion'
  import type { SpeakerProps } from './types'

  let { volume = 0, ...rest }: SpeakerProps = $props()

  let jumpOffsetY = new Tween(0)
  let jumpRotationX = new Tween(0)
  let jumpRotationZ = new Tween(0)
  let isJumping = $state(false)

  const randomSign = () => Math.round(Math.random()) * 2 - 1

  const jump = () => {
    isJumping = true
    const upDuration = 10 + Math.random() * 50

    jumpOffsetY.set(0.2, {
      duration: upDuration,
      easing: cubicOut
    })
    jumpRotationX.set(Math.random() * 4 * randomSign(), {
      duration: upDuration,
      easing: cubicOut
    })
    jumpRotationZ.set(Math.random() * 4 * randomSign(), {
      duration: upDuration,
      easing: cubicOut
    })

    setTimeout(() => {
      const downDuration = 40 + Math.random() * 70

      jumpOffsetY.set(0, {
        duration: downDuration,
        easing: cubicIn
      })
      jumpRotationX.set(0, {
        duration: downDuration,
        easing: cubicIn
      })
      jumpRotationZ.set(0, {
        duration: downDuration,
        easing: cubicIn
      })

      setTimeout(() => {
        isJumping = false
      }, downDuration * 1.5)
    }, upDuration)
  }

  $effect(() => {
    if (volume > 0.25 && !isJumping) jump()
  })
</script>

<T.Group {...rest}>
  <T.Group
    position.y={jumpOffsetY.current}
    rotation.z={MathUtils.DEG2RAD * jumpRotationZ.current}
    rotation.x={MathUtils.DEG2RAD * jumpRotationX.current}
  >
    <!-- CASE -->
    <T.Mesh
      castShadow
      receiveShadow
      position.y={2.5}
    >
      <T.BoxGeometry args={[3, 5, 3]} />
      <T.MeshStandardMaterial color="#eedbcb" />
      <Edges
        color={'black'}
        scale={1.001}
      />
    </T.Mesh>

    <!-- CONE -->
    <T.Mesh
      position.z={1.1}
      position.y={3.5}
      scale={1 + volume}
      rotation.x={MathUtils.DEG2RAD * -90}
    >
      <T.ConeGeometry args={[1, 1, 64]} />
      <T.MeshStandardMaterial
        flatShading
        color="#111111"
      />
      <Edges
        color="black"
        scale={1.001}
        thresholdAngle={20}
      />
    </T.Mesh>
  </T.Group>
</T.Group>
