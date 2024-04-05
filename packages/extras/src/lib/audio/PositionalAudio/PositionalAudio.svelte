<script lang="ts">
  import { T } from '@threlte/core'
  import { PositionalAudio as ThreePositionalAudio } from 'three'
  import { useAudio } from '../utils/useAudio'
  import { useThrelteAudio } from '../useThrelteAudio'
  import type {
    PositionalAudioEvents,
    PositionalAudioProps,
    PositionalAudioSlots
  } from './PositionalAudio.svelte'

  type $$Props = PositionalAudioProps
  type $$Events = PositionalAudioEvents
  type $$Slots = PositionalAudioSlots

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
    play = $bindable(),
    pause = $bindable(),
    stop = $bindable(),
    ref = $bindable(),
    ...restProps
  }: PositionalAudioProps & { ref: ThreePositionalAudio } = $props()

  const { getAudioListener } = useThrelteAudio()

  const listener = getAudioListener(id)

  if (!listener) {
    throw new Error(`No Audiolistener with id ${id} found.`)
  }

  ref = new ThreePositionalAudio(listener)

  $effect(() => {
    if (refDistance !== undefined) ref.setRefDistance(refDistance)
    if (rolloffFactor !== undefined) ref.setRolloffFactor(rolloffFactor)
    if (distanceModel !== undefined) ref.setDistanceModel(distanceModel)
    if (maxDistance !== undefined) ref.setMaxDistance(maxDistance)
    if (directionalCone !== undefined) {
      ref.setDirectionalCone(
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
  } = useAudio(ref, restProps.$$events)

  pause = useAudioProps.pause
  play = useAudioProps.play
  stop = useAudioProps.stop

  $effect(() => setAutoPlay(autoplay))
  $effect(() => void setSource(src))
  $effect(() => setVolume(volume))
  $effect(() => setPlaybackRate(playbackRate))
  $effect(() => setLoop(loop))
  $effect(() => setDetune(detune))
</script>

<T
  is={ref}
  {...restProps}
>
  <slot {ref} />
</T>
