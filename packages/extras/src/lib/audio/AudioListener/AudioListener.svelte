<script lang="ts">
  import { T } from '@threlte/core'
  import { onDestroy } from 'svelte'
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
  resumeContext = async () => await listener.context.resume()

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
  bind:ref
  {...props}
>
	{@render children?.({ ref: listener })}
</T>
