<script lang="ts">
  import { T } from '@threlte/core'
  import { Audio as ThreeAudio } from 'three'
  import { useAudio } from '../utils/useAudio'
  import { useThrelteAudio } from '../useThrelteAudio'
  import type { AudioEvents, AudioProps, AudioSlots } from './Audio.svelte'

  type $$Props = AudioProps
  type $$Events = AudioEvents
  type $$Slots = AudioSlots

  let {
    src,
    id,
    volume,
    playbackRate,
    autoplay,
    detune,
    loop,
    ref = $bindable(),
    pause = $bindable(),
    play = $bindable(),
    stop = $bindable(),
    ...restProps
  }: AudioProps = $props()

  const { getAudioListener } = useThrelteAudio()

  const listener = getAudioListener(id)

  if (!listener) {
    throw new Error(`No Audiolistener with id ${id} found.`)
  }

  ref = new ThreeAudio<GainNode>(listener)

  const { setAutoPlay, setDetune, setLoop, setPlaybackRate, setSrc, setVolume, ...useAudioProps } =
    useAudio(ref, restProps.$$events)

  pause = useAudioProps.pause
  play = useAudioProps.play
  stop = useAudioProps.stop

  $effect(() => setAutoPlay(autoplay))
  $effect(() => void setSrc(src))
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
