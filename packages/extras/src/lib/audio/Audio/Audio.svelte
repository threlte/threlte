<script lang="ts">
  import { T } from '@threlte/core'
  import { Audio as ThreeAudio } from 'three'
  import { useAudio } from '../utils/useAudio.svelte.js'
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

  const listener = $derived(getAudioListener(id))

  const audio = $derived.by(() => {
    if (!listener) {
      throw new Error(`No Audiolistener with id ${id} found.`)
    }

    return new ThreeAudio<GainNode>(listener)
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
