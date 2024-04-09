<script lang="ts">
  import { T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { AudioListener as ThreeAudioListener } from 'three'
  import { useThrelteAudio } from '../useThrelteAudio'
  import type {
    AudioListenerProps,
    AudioListenerEvents,
    AudioListenerSlots
  } from './AudioListener.svelte'

  type $$Events = AudioListenerEvents
  type $$Slots = AudioListenerSlots

  let {
    id,
    masterVolume,
    ref = $bindable(),
    audioContext = $bindable(),
    resumeContext = $bindable(),
    ...props
  }: AudioListenerProps = $props()

  const listener = new ThreeAudioListener()

  ref = listener
  audioContext = listener.context
  resumeContext = async () => await listener.context.resume()

  $effect.pre(() => {
    if (masterVolume !== undefined) {
      listener.setMasterVolume(masterVolume)
    }
  })

  const { addAudioListener, removeAudioListener } = useThrelteAudio()

  addAudioListener(ref, id)

  onDestroy(() => {
    removeAudioListener(id)
  })
</script>

<T
  is={listener}
  {...props}
>
  <slot ref={listener} />
</T>
