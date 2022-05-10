<script lang="ts">
  import { useThrelteAudio } from '$lib/hooks/useThrelteAudio'
  import AudioInstance from '$lib/instances/AudioInstance.svelte'
  import type { AudioProperties } from '$lib/types/components'
  import { Audio } from 'three'

  export let position: AudioProperties['position'] = undefined
  export let scale: AudioProperties['scale'] = undefined
  export let rotation: AudioProperties['rotation'] = undefined
  export let lookAt: AudioProperties['lookAt'] = undefined
  export let viewportAware: AudioProperties['viewportAware'] = false
  export let inViewport: AudioProperties['inViewport'] = false
  export let castShadow: AudioProperties['castShadow'] = undefined
  export let receiveShadow: AudioProperties['receiveShadow'] = undefined
  export let frustumCulled: AudioProperties['frustumCulled'] = undefined
  export let renderOrder: AudioProperties['renderOrder'] = undefined
  export let visible: AudioProperties['visible'] = undefined

  export let autoplay: AudioProperties['autoplay'] = undefined
  export let detune: AudioProperties['detune'] = undefined
  export let buffer: AudioProperties['buffer'] = undefined
  export let url: AudioProperties['url'] = undefined
  export let volume: AudioProperties['volume'] = undefined
  export let loop: AudioProperties['loop'] = undefined
  export let id: AudioProperties['id'] = undefined

  const { getAudioListener } = useThrelteAudio()

  const listener = getAudioListener(id)

  if (!listener) {
    throw new Error(`No Audiolistener with id ${id} found.`)
  }

  export const audio = new Audio(listener)

  export const play = () => audio.play()
  export const pause = () => audio.pause()
  export const stop = () => audio.stop()
</script>

<AudioInstance
  {audio}
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
  {autoplay}
  {buffer}
  {detune}
  {loop}
  {url}
  {volume}
  bind:inViewport
  on:viewportenter
  on:viewportleave
>
  <slot />
</AudioInstance>
