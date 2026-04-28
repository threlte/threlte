<script lang="ts">
  import { T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { AudioListener as ThreeAudioListener } from 'three'
  import { useThrelteAudio } from '../useThrelteAudio.js'
  import { acquireAutoResume } from './autoResume.js'
  import type { AudioListenerProps } from './types.js'

  let {
    id,
    masterVolume,
    autoResume,
    ref = $bindable(),
    children,
    ...props
  }: AudioListenerProps = $props()

  const listener = new ThreeAudioListener()

  export const audioContext: AudioContext = listener.context
  export const resumeContext: () => Promise<void> = () => listener.context.resume()

  $effect.pre(() => {
    if (masterVolume !== undefined) {
      listener.setMasterVolume(masterVolume)
    }
  })

  $effect(() => {
    if (!autoResume) return
    return acquireAutoResume(listener.context)
  })

  const { addAudioListener, removeAudioListener } = useThrelteAudio()

  addAudioListener(listener, id)

  onDestroy(() => {
    removeAudioListener(id)
  })
</script>

<T
  is={listener}
  bind:ref
  {...props}
>
  {@render children?.({ ref: listener })}
</T>
