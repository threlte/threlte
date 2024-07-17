<script lang="ts">
  import { T } from '@threlte/core'
  import { AudioListener as ThreeAudioListener } from 'three'
  import { useThrelteAudio } from '../useThrelteAudio'
  import type { AudioListenerProps } from './AudioListener.svelte'

  let {
    id,
    masterVolume,
    ref = $bindable(),
    audioContext = $bindable(),
    resumeContext = $bindable(),
    children,
    ...props
  }: AudioListenerProps = $props()

  const listener = new ThreeAudioListener()

  audioContext = listener.context
  resumeContext = () => listener.context.resume()

  $effect.pre(() => {
    if (masterVolume !== undefined) {
      listener.setMasterVolume(masterVolume)
    }
  })

  const { addAudioListener, removeAudioListener } = useThrelteAudio()

  $effect.pre(() => {
    addAudioListener(listener, id)
    return () => removeAudioListener(id)
  })
</script>

<T
  is={listener}
  bind:ref
  {...props}
>
  {@render children?.({ ref: listener })}
</T>
