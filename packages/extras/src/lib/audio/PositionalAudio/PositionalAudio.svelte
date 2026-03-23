<script lang="ts">
  import { T } from '@threlte/core'
  import { PositionalAudio as ThreePositionalAudio } from 'three'
  import { useAudio } from '../utils/useAudio.svelte.js'
  import { useThrelteAudio } from '../useThrelteAudio.js'
  import type { PositionalAudioProps } from './types.js'

  let {
    src,
    id,
    volume,
    playbackRate,
    autoplay,
    detune,
    loop,
    directionalCone,
    refDistance,
    rolloffFactor,
    distanceModel,
    maxDistance,
    ref = $bindable(),
    children,
    ...props
  }: PositionalAudioProps = $props()

  const { getAudioListener } = useThrelteAudio()

  const listener = $derived(getAudioListener(id))

  const audio = $derived.by(() => {
    if (!listener) {
      throw new Error(`No Audiolistener with id ${id} found.`)
    }

    return new ThreePositionalAudio(listener)
  })

  $effect(() => {
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

  export const play = useAudio(
    () => audio,
    () => src,
    {
      ...props
    }
  )

  export const pause = () => audio.pause()
  export const stop = () => audio.stop()

  $effect(() => {
    if (autoplay) {
      play()
    } else {
      stop()
    }
  })

  $effect(() => {
    audio.setVolume(volume ?? 1)
  })

  $effect(() => {
    audio.setPlaybackRate(playbackRate ?? 1)
  })

  $effect(() => {
    audio.setDetune(detune ?? 0)
  })

  $effect(() => {
    audio.setLoop(loop ?? false)
  })
</script>

<T
  is={audio}
  bind:ref
  {...props}
>
  {@render children?.({ ref: audio })}
</T>
