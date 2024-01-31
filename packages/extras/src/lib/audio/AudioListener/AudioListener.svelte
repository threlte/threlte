<script lang="ts">
  import { forwardEventHandlers, T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { AudioListener as ThreeAudioListener } from 'three'
  import { useThrelteAudio } from '../useThrelteAudio'
  import type {
    AudioListenerProps,
    AudioListenerEvents,
    AudioListenerSlots
  } from './AudioListener.svelte'

  type $$Props = AudioListenerProps
  type $$Events = AudioListenerEvents
  type $$Slots = AudioListenerSlots

  export let id: $$Props['id'] = undefined
  export let masterVolume: $$Props['masterVolume'] = undefined

  export const ref = new ThreeAudioListener()

  export const audioContext = ref.context
  export const resumeContext = async () => await ref.context.resume()

  $: if (masterVolume !== undefined) ref.setMasterVolume(masterVolume)

  const { addAudioListener, removeAudioListener } = useThrelteAudio()

  addAudioListener(ref, id)

  onDestroy(() => {
    removeAudioListener(id)
  })

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
