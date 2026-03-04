<script lang="ts">
  import type { ExtrudeGeometryOptions, Mesh, Vector3Tuple } from 'three'
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

  let positionIndex = 0
  const positionTween = new Tween(positions[positionIndex], {
    duration: 400,
    easing: quadInOut
  })
  let time = 0

  // if `positions` changes, restart
  $effect(() => {
    positions
    positionIndex = 0
    positionTween.set(positions[positionIndex], { duration: 0 })
    time = 0
  })

  useTask(
    (delta) => {
      time += delta
      if (time > 0.5) {
        positionIndex += 1
        positionIndex %= positions.length
        positionTween.set(positions[positionIndex])
        time = 0
      }
    },
    {
      running: () => play
    }
  )

  const extrudeOptions: ExtrudeGeometryOptions = { bevelEnabled: false }
</script>

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<T.OrthographicCamera
  makeDefault
  position={[10, 10, 10]}
  zoom={50}
>
  <OrbitControls
    {autoRotate}
    enableDamping
  />
</T.OrthographicCamera>

<T.Group rotation.x={-1 * 0.5 * Math.PI}>
  {#each walls as { height, shape }}
    <T.Mesh scale.z={height}>
      <T.ExtrudeGeometry args={[shape, extrudeOptions]} />
      <T.MeshStandardMaterial color="silver" />
    </T.Mesh>
  {/each}

  <T.Group position={positionTween.current ?? positions[0] ?? [0, 0, 0]}>
    <T is={mesh}>
      <T.MeshStandardMaterial color="gold" />
      <T.BoxGeometry />
    </T>
  </T.Group>

  <T.Mesh
    scale={100}
    position.z={-1.01}
  >
    <T.PlaneGeometry />
    <T.MeshStandardMaterial
      color="green"
      side={DoubleSide}
    />
  </T.Mesh>
</T.Group>
