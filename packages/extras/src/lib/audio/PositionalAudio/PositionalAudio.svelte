<script lang="ts">
  import { forwardEventHandlers, T } from '@threlte/core'
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

  export let src: $$Props['src']
  export let id: $$Props['id'] = undefined
  export let volume: $$Props['volume'] = undefined
  export let playbackRate: $$Props['playbackRate'] = undefined
  export let autoplay: $$Props['autoplay'] = undefined
  export let detune: $$Props['detune'] = undefined
  export let loop: $$Props['loop'] = undefined

  export let directionalCone: $$Props['directionalCone'] = undefined
  export let refDistance: $$Props['refDistance'] = undefined
  export let rolloffFactor: $$Props['rolloffFactor'] = undefined
  export let distanceModel: $$Props['distanceModel'] = undefined
  export let maxDistance: $$Props['maxDistance'] = undefined

  const { getAudioListener } = useThrelteAudio()

  const listener = getAudioListener(id)

  if (!listener) {
    throw new Error(`No Audiolistener with id ${id} found.`)
  }

  export const ref = new ThreePositionalAudio(listener)

  $: {
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
  }

  const {
    pause,
    play,
    stop,
    setAutoPlay,
    setDetune,
    setLoop,
    setPlaybackRate,
    setSrc: setSource,
    setVolume
  } = useAudio(ref)
  export { play, pause, stop }
  $: setAutoPlay(autoplay)
  $: setSource(src)
  $: setVolume(volume)
  $: setPlaybackRate(playbackRate)
  $: setLoop(loop)
  $: setDetune(detune)

  const component = forwardEventHandlers()
</script>

<T
  is={ref}
  {...$$restProps}
  let:ref
  bind:this={$component}
>
  <slot {ref} />
</T>
