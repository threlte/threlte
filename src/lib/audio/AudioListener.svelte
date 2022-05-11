<script lang="ts">
  import { onDestroy } from 'svelte'
  import { AudioListener } from 'three'
  import { useThrelteAudio } from '../hooks/useThrelteAudio'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import type { AudioListenerProperties } from '../types/components'

  export let position: AudioListenerProperties['position'] = undefined
  export let scale: AudioListenerProperties['scale'] = undefined
  export let rotation: AudioListenerProperties['rotation'] = undefined
  export let lookAt: AudioListenerProperties['lookAt'] = undefined
  export let viewportAware: AudioListenerProperties['viewportAware'] = false
  export let inViewport: AudioListenerProperties['inViewport'] = false
  export let castShadow: AudioListenerProperties['castShadow'] = undefined
  export let receiveShadow: AudioListenerProperties['receiveShadow'] = undefined
  export let frustumCulled: AudioListenerProperties['frustumCulled'] = undefined
  export let renderOrder: AudioListenerProperties['renderOrder'] = undefined
  export let visible: AudioListenerProperties['visible'] = undefined

  export let id: AudioListenerProperties['id'] = undefined
  export let masterVolume: AudioListenerProperties['masterVolume'] = undefined

  export const listener = new AudioListener()

  export const context = listener.context
  export const resumeContext = async () => await listener.context.resume()

  $: if (masterVolume !== undefined) listener.setMasterVolume(masterVolume)

  const { addAudioListener, removeAudioListener } = useThrelteAudio()

  addAudioListener(listener, id)

  onDestroy(() => {
    removeAudioListener(id)
  })
</script>

<Object3DInstance
  object={listener}
  {position}
  {scale}
  {rotation}
  {lookAt}
  {frustumCulled}
  {renderOrder}
  {visible}
  {castShadow}
  {receiveShadow}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
>
  <slot />
</Object3DInstance>
