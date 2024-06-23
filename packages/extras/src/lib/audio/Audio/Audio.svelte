<script lang="ts">
  import { T } from '@threlte/core'
  import { Audio as ThreeAudio } from 'three'
  import { useAudio } from '../utils/useAudio'
  import { useThrelteAudio } from '../useThrelteAudio'
  import type { AudioProps } from './Audio.svelte'

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
  is={audio}
  bind:ref
  {...props}
>
	{@render children?.({ ref: audio })}
</T>
