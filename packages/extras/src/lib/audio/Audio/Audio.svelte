<script lang="ts">
  import { T } from '@threlte/core'
  import { Audio as ThreeAudio } from 'three'
  import { useAudio } from '../utils/useAudio.js'
  import { useThrelteAudio } from '../useThrelteAudio.js'
  import type { AudioProps } from './types.js'

  let {
    src,
    id,
    volume,
    playbackRate,
    autoplay,
    detune,
    loop,
    ref = $bindable(),
    children,
    ...props
  }: AudioProps = $props()

  const { getAudioListener } = useThrelteAudio()

  const listener = getAudioListener(id)

  if (!listener) {
    throw new Error(`No Audiolistener with id ${id} found.`)
  }

  const audio = new ThreeAudio<GainNode>(listener)

  const { setAutoPlay, setDetune, setLoop, setPlaybackRate, setSrc, setVolume, ...useAudioProps } =
    useAudio(audio, props)

  export const pause = useAudioProps.pause
  export const play = useAudioProps.play
  export const stop = useAudioProps.stop

  $effect(() => setAutoPlay(autoplay))
  $effect(() => void setSrc(src))
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
