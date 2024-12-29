<script lang="ts">
  import type { Mesh, Vector3Tuple } from 'three'
  import type { Wall } from './types'
  import { DoubleSide } from 'three'
  import { Environment, OrbitControls } from '@threlte/extras'
  import { T, useTask } from '@threlte/core'
  import { Tween } from 'svelte/motion'
  import { quadInOut } from 'svelte/easing'

  type Props = {
    autoRotate?: boolean
    mesh: Mesh
    play?: boolean
    positions?: Vector3Tuple[]
    walls?: Wall[]
  }

  let { autoRotate = true, mesh, positions = [], play = true, walls = [] }: Props = $props()

  let positionIndex = $state(0)
  const position = $derived(positions[positionIndex])

  const positionTween = Tween.of(() => position, {
    duration: 400,
    easing: quadInOut
  })

  let time = $state(0)

  const { start, stop } = useTask((delta) => {
    time += delta
    if (time > 0.5) {
      positionIndex = (positionIndex + 1) % positions.length
      time = 0
    }
  })

  $effect(() => {
    if (play) {
      start()
      return () => {
        stop()
      }
    }
  })
</script>

{#each walls as { position, rotation, size }}
  <T.Mesh
    {position}
    {rotation}
  >
    <T.BoxGeometry args={size} />
    <T.MeshStandardMaterial color="silver" />
  </T.Mesh>
{/each}

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<T.Group position={positionTween.current ?? [0, 0, 0]}>
  <T
    is={mesh}
    castShadow
  >
    <T.MeshStandardMaterial color="gold" />
    <T.BoxGeometry />
  </T>
</T.Group>

<T.PerspectiveCamera
  makeDefault
  position={[0, 6, -10]}
  fov={60}
>
  <OrbitControls
    {autoRotate}
    enableDamping
    target={[0, 0, 5]}
  />
</T.PerspectiveCamera>

<T.Mesh
  scale={100}
  rotation.x={-1 * 0.5 * Math.PI}
  receiveShadow
>
  <T.PlaneGeometry />
  <T.MeshStandardMaterial
    color="green"
    side={DoubleSide}
  />
</T.Mesh>
