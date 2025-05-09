<script lang="ts">
  import { T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { AudioListener as ThreeAudioListener } from 'three'
  import { useThrelteAudio } from '../useThrelteAudio'
  import type { AudioListenerProps } from './types'

  let { id, masterVolume, ref = $bindable(), children, ...props }: AudioListenerProps = $props()

  const listener = new ThreeAudioListener()
  ref = listener

  export const audioContext = listener.context
  export const resumeContext = () => listener.context.resume()

  $effect.pre(() => {
    if (masterVolume !== undefined) {
      listener.setMasterVolume(masterVolume)
    }
  })

  const { addAudioListener, removeAudioListener } = useThrelteAudio()

  addAudioListener(listener, id)

  onDestroy(() => {
    removeAudioListener(id)
  })
</script>

<T
  is={listener}
  {...props}
>
  {@render children?.({ ref: listener })}
</T>
