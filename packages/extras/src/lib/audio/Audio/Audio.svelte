<script lang="ts">
  import { T } from '@threlte/core'
  import { Audio as ThreeAudio } from 'three'
  import { useAudio } from '../useAudio'
  import { useThrelteAudio } from '../useThrelteAudio'
  import type { AudioEvents, AudioProps, AudioSlots } from './Audio.svelte'

  type $$Props = AudioProps
  type $$Events = AudioEvents
  type $$Slots = AudioSlots

  export let source: $$Props['source']
  export let id: $$Props['id'] = undefined
  export let volume: $$Props['volume'] = undefined
  export let playbackRate: $$Props['playbackRate'] = undefined
  export let autoplay: $$Props['autoplay'] = undefined
  export let detune: $$Props['detune'] = undefined
  export let loop: $$Props['loop'] = undefined

  const { getAudioListener } = useThrelteAudio()

  const listener = getAudioListener(id)

  if (!listener) {
    throw new Error(`No Audiolistener with id ${id} found.`)
  }

  export const ref = new ThreeAudio<GainNode>(listener)

  const {
    pause,
    play,
    stop,
    setAutoPlay,
    setDetune,
    setLoop,
    setPlaybackRate,
    setSource,
    setVolume
  } = useAudio(ref)
  export { play, pause, stop }
  $: setAutoPlay(autoplay)
  $: setSource(source)
  $: setVolume(volume)
  $: setPlaybackRate(playbackRate)
  $: setLoop(loop)
  $: setDetune(detune)
</script>

<T is={ref} {...$$restProps} let:ref>
  <slot {ref} />
</T>
