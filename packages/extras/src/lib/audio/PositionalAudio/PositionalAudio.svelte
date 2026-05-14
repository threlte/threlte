<script lang="ts">
  import { T } from '@threlte/core'
  import { PositionalAudio } from 'three'
  import { useAudio } from '../utils/useAudio.svelte.js'
  import { useThrelteAudio } from '../useThrelteAudio.js'
  import type { PositionalAudioProps } from './types.js'

  let {
    id,
    src,
    autoplay = false,
    loop = false,
    volume = 1,
    playbackRate = 1,
    detune = 0,
    directionalCone,
    refDistance,
    rolloffFactor,
    distanceModel,
    maxDistance,
    ref = $bindable(),
    children,
    ...rest
  }: PositionalAudioProps = $props()

  const { getAudioListener } = useThrelteAudio()

  const listener = $derived(getAudioListener(id))

  $effect(() => {
    if (!listener) {
      console.warn(`No Audiolistener with id ${id} found.`)
    }
  })

  const audio = $derived(listener ? new PositionalAudio(listener) : undefined)

  $effect(() => {
    if (!audio) return

    if (refDistance !== undefined) {
      audio.setRefDistance(refDistance)
    }

    if (rolloffFactor !== undefined) {
      audio.setRolloffFactor(rolloffFactor)
    }

    if (distanceModel !== undefined) {
      audio.setDistanceModel(distanceModel)
    }

    if (maxDistance !== undefined) {
      audio.setMaxDistance(maxDistance)
    }

    if (directionalCone !== undefined) {
      audio.setDirectionalCone(
        directionalCone.coneInnerAngle,
        directionalCone.coneOuterAngle,
        directionalCone.coneOuterGain
      )
    }
  })

  export const { pause, play, stop } = useAudio(
    () => audio,
    () => src,
    () => autoplay,
    () => loop,
    () => volume,
    () => playbackRate,
    () => detune,
    () => rest
  )
</script>

{#if audio}
  <T
    is={audio}
    bind:ref
    {...rest}
  >
    {@render children?.({ ref: audio })}
  </T>
{/if}
