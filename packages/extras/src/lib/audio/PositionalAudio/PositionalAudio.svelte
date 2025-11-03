<script lang="ts">
  import { T } from '@threlte/core'
  import { PositionalAudio as ThreePositionalAudio } from 'three'
  import { useAudio } from '../utils/useAudio.js'
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

  const listener = getAudioListener(id)

  if (!listener) {
    throw new Error(`No Audiolistener with id ${id} found.`)
  }

  const audio = new ThreePositionalAudio(listener)

  $effect(() => {
    if (refDistance !== undefined) audio.setRefDistance(refDistance)
    if (rolloffFactor !== undefined) audio.setRolloffFactor(rolloffFactor)
    if (distanceModel !== undefined) audio.setDistanceModel(distanceModel)
    if (maxDistance !== undefined) audio.setMaxDistance(maxDistance)
    if (directionalCone !== undefined) {
      audio.setDirectionalCone(
        directionalCone.coneInnerAngle,
        directionalCone.coneOuterAngle,
        directionalCone.coneOuterGain
      )
    }
  })

  const {
    setAutoPlay,
    setDetune,
    setLoop,
    setPlaybackRate,
    setSrc: setSource,
    setVolume,
    ...useAudioProps
  } = useAudio(audio, props)

  export const pause = useAudioProps.pause
  export const play = useAudioProps.play
  export const stop = useAudioProps.stop

  $effect(() => setAutoPlay(autoplay))
  $effect(() => void setSource(src))
  $effect(() => setVolume(volume))
  $effect(() => setPlaybackRate(playbackRate))
  $effect(() => setLoop(loop))
  $effect(() => setDetune(detune))
</script>

<T
  is={audio}
  bind:ref
  {...props}
>
  {@render children?.({ ref: audio })}
</T>
