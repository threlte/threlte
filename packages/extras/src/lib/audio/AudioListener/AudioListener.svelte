<script lang="ts">
  import { T } from '@threlte/core'
  import { AudioListener } from 'three'
  import { useThrelteAudio } from '../useThrelteAudio.js'
  import { acquireAutoResume } from './autoResume.js'
  import type { AudioListenerProps } from './types.js'
  import { untrack } from 'svelte'

  let {
    id,
    masterVolume,
    autoResume,
    ref = $bindable(),
    children,
    ...props
  }: AudioListenerProps = $props()

  const listener = new AudioListener()

  export const audioContext = listener.context
  export const resumeContext = () => listener.context.resume()

  $effect(() => {
    if (masterVolume !== undefined) {
      listener.setMasterVolume(masterVolume)
    }
  })

  $effect(() => {
    if (!autoResume) return

    return acquireAutoResume(listener.context)
  })

  const { addAudioListener, removeAudioListener } = useThrelteAudio()

  $effect.pre(() => {
    const currentId = id
    return untrack(() => {
      addAudioListener(listener, currentId)
      return () => removeAudioListener(currentId)
    })
  })
</script>

<T
  is={listener}
  bind:ref
  {...props}
>
  {@render children?.({ ref: listener })}
</T>
