<script
  lang="ts"
  module
>
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshStandardMaterial()
  export const muted = writable(true)
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { PositionalAudio } from '@threlte/extras'
  import { Collider, RigidBody, type ContactEvent } from '@threlte/rapier'
  import { writable } from 'svelte/store'
  import type { Euler, Vector3 } from 'three'
  import { BoxGeometry, MeshStandardMaterial, MathUtils } from 'three'

  interface Props {
    position?: Vector3 | undefined
    rotation?: Euler | undefined
  }

  let { position = undefined, rotation = undefined }: Props = $props()

  const audios: {
    threshold: number
    volume: number
    ref: PositionalAudio | undefined
    source: string
  }[] = $state(
    new Array(9).fill(0).map((_, i) => {
      return {
        threshold: i / 10,
        ref: undefined,
        volume: (i + 2) / 10,
        source: `/audio/ball_bounce_${i + 1}.mp3`
      }
    })
  )

  const fireSound: ContactEvent = (event) => {
    if ($muted) return
    const volume = MathUtils.clamp((event.totalForceMagnitude - 30) / 1100, 0.1, 1)
    const audio = audios.find((a) => a.volume >= volume)
    audio?.ref?.stop?.()
    audio?.ref?.play?.()
  }

  let rotationCasted = $derived(rotation?.toArray() as [x: number, y: number, z: number])
</script>

<T.Group
  position.x={position?.x}
  position.y={position?.y}
  position.z={position?.z}
  rotation={rotationCasted}
>
  <RigidBody
    type={'dynamic'}
    oncontact={fireSound}
  >
    {#each audios as audio}
      <PositionalAudio
        bind:this={audio.ref}
        autoplay={false}
        detune={600 - Math.random() * 1200}
        src={audio.source}
        volume={audio.volume}
      />
    {/each}

    <Collider
      contactForceEventThreshold={30}
      restitution={0.4}
      shape={'cuboid'}
      args={[0.5, 0.5, 0.5]}
    />
    <T.Mesh
      castShadow
      receiveShadow
      {geometry}
      {material}
    />
  </RigidBody>
</T.Group>
