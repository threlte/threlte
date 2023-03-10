<script lang="ts">
  import { T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { AudioListener as ThreeAudioListener } from 'three'
  import { useThrelteAudio } from '../useThrelteAudio'
  import type { AudioListenerProps } from './AudioListener.svelte'

  type $$Props = AudioListenerProps

  export let id: $$Props['id'] = undefined
  export let masterVolume: $$Props['masterVolume'] = undefined

  export const listener = new ThreeAudioListener()

  export const context = listener.context
  export const resumeContext = async () => await listener.context.resume()

  $: if (masterVolume !== undefined) listener.setMasterVolume(masterVolume)

  const { addAudioListener, removeAudioListener } = useThrelteAudio()

  addAudioListener(listener, id)

  onDestroy(() => {
    removeAudioListener(id)
  })
</script>

<T
  is={listener}
  {...$$restProps}
>
  <slot />
</T>
