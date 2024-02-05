<script lang="ts">
  import { T } from '@threlte/core'
  import { Edges } from '@threlte/extras'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  export let volume: number = 0

  let jumpOffsetY = tweened(0)
  let jumpRotationX = tweened(0)
  let jumpRotationZ = tweened(0)
  let isJumping = false

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

  $: if (volume > 0.25 && !isJumping) jump()
</script>

<T.Group {...$$restProps}>
  <T.Group
    position.y={$jumpOffsetY}
    rotation.z={DEG2RAD * $jumpRotationZ}
    rotation.x={DEG2RAD * $jumpRotationX}
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
      rotation.x={DEG2RAD * -90}
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
