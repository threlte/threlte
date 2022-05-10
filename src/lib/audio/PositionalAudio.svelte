<script lang="ts">
  import { useThrelteAudio } from '$lib/hooks/useThrelteAudio'
  import AudioInstance from '$lib/instances/AudioInstance.svelte'
  import type { PositionalAudioProperties } from '$lib/types/components'
  import { PositionalAudio } from 'three'

  export let position: PositionalAudioProperties['position'] = undefined
  export let scale: PositionalAudioProperties['scale'] = undefined
  export let rotation: PositionalAudioProperties['rotation'] = undefined
  export let lookAt: PositionalAudioProperties['lookAt'] = undefined
  export let viewportAware: PositionalAudioProperties['viewportAware'] = false
  export let inViewport: PositionalAudioProperties['inViewport'] = false
  export let castShadow: PositionalAudioProperties['castShadow'] = undefined
  export let receiveShadow: PositionalAudioProperties['receiveShadow'] = undefined
  export let frustumCulled: PositionalAudioProperties['frustumCulled'] = undefined
  export let renderOrder: PositionalAudioProperties['renderOrder'] = undefined
  export let visible: PositionalAudioProperties['visible'] = undefined

  export let autoplay: PositionalAudioProperties['autoplay'] = undefined
  export let detune: PositionalAudioProperties['detune'] = undefined
  export let buffer: PositionalAudioProperties['buffer'] = undefined
  export let url: PositionalAudioProperties['url'] = undefined
  export let volume: PositionalAudioProperties['volume'] = undefined
  export let loop: PositionalAudioProperties['loop'] = undefined
  export let id: PositionalAudioProperties['id'] = undefined

  const { getAudioListener } = useThrelteAudio()

  const listener = getAudioListener(id)

  if (!listener) {
    throw new Error(`No Audiolistener with id ${id} found.`)
  }

  export const audio = new PositionalAudio(listener)

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
