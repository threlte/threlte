<script lang="ts">
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { BoxBufferGeometry, ConeBufferGeometry, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import type { Position, Rotation, Scale } from 'threlte'
  import { Group, Mesh } from 'threlte'
  import { Edges } from 'threlte/extras'

  export let volume: number = 0

  export let position: Position | undefined = undefined
  export let rotation: Rotation | undefined = undefined
  export let scale: Scale | undefined = undefined

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

<Group {position} {rotation} {scale}>
  <Group
    position={{ y: $jumpOffsetY }}
    rotation={{ z: DEG2RAD * $jumpRotationZ, x: DEG2RAD * $jumpRotationX }}
  >
    <!-- CASE -->
    <Mesh
      castShadow
      receiveShadow
      position={{ y: 2.5 }}
      geometry={new BoxBufferGeometry(3, 5, 3)}
      material={new MeshStandardMaterial({
        color: 0xeedbcb
      })}
    >
      <Edges ignorePointer color={'black'} scale={1.001} />
    </Mesh>

    <!-- CONE -->
    <Mesh
      geometry={new ConeBufferGeometry(1, 1, 64)}
      position={{ z: 1.1, y: 3.5 }}
      scale={1 + volume}
      rotation={{ x: DEG2RAD * -90 }}
      material={new MeshStandardMaterial({
        flatShading: true,
        color: 0x111111
      })}
    >
      <Edges ignorePointer color="black" scale={1.001} threshold={20} />
    </Mesh>
  </Group>
</Group>
