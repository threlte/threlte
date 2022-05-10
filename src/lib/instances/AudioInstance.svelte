<script lang="ts">
  import { useLoader } from '$lib/hooks/useLoader'
  import type { AudioInstanceProperties } from '$lib/types/components'
  import { onDestroy } from 'svelte'
  import { AudioLoader } from 'three'
  import Object3DInstance from '../instances/Object3DInstance.svelte'

  export let position: AudioInstanceProperties['position'] = undefined
  export let scale: AudioInstanceProperties['scale'] = undefined
  export let rotation: AudioInstanceProperties['rotation'] = undefined
  export let lookAt: AudioInstanceProperties['lookAt'] = undefined
  export let viewportAware: AudioInstanceProperties['viewportAware'] = false
  export let inViewport: AudioInstanceProperties['inViewport'] = false
  export let castShadow: AudioInstanceProperties['castShadow'] = undefined
  export let receiveShadow: AudioInstanceProperties['receiveShadow'] = undefined
  export let frustumCulled: AudioInstanceProperties['frustumCulled'] = undefined
  export let renderOrder: AudioInstanceProperties['renderOrder'] = undefined
  export let visible: AudioInstanceProperties['visible'] = undefined

  export let autoplay: AudioInstanceProperties['autoplay'] = undefined
  export let detune: AudioInstanceProperties['detune'] = undefined
  export let buffer: AudioInstanceProperties['buffer'] = undefined
  export let url: AudioInstanceProperties['url'] = undefined
  export let volume: AudioInstanceProperties['volume'] = undefined
  export let loop: AudioInstanceProperties['loop'] = undefined

  export let audio: AudioInstanceProperties['audio']

  const loader = useLoader(AudioLoader, () => new AudioLoader())

  $: {
    if (autoplay !== undefined) audio.autoplay = autoplay
    if (detune !== undefined) audio.detune = detune
    if (volume !== undefined) audio.setVolume(volume)
    if (loop !== undefined) audio.setLoop(loop)

    if (url !== undefined && buffer !== undefined) {
      console.warn('Both properties "url" and "buffer" have been set, using property "url"')
    }

    if (url !== undefined) {
      loader.load(url, (buffer) => {
        audio.setBuffer(buffer)
      })
    } else if (buffer !== undefined) {
      audio.setBuffer(buffer)
    }
  }

  onDestroy(() => {
    audio.stop()
  })
</script>

<Object3DInstance
  object={audio}
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
