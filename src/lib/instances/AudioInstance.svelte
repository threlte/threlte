<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { Audio, AudioLoader, PositionalAudio } from 'three'
  import { useLoader } from '../hooks/useLoader'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import type { AudioInstanceProperties } from '../types/components'

  type T = Audio<GainNode> | PositionalAudio
  type Props = AudioInstanceProperties<T>

  export let position: Props['position'] = undefined
  export let scale: Props['scale'] = undefined
  export let rotation: Props['rotation'] = undefined
  export let lookAt: Props['lookAt'] = undefined
  export let viewportAware: Props['viewportAware'] = false
  export let inViewport: Props['inViewport'] = false
  export let castShadow: Props['castShadow'] = undefined
  export let receiveShadow: Props['receiveShadow'] = undefined
  export let frustumCulled: Props['frustumCulled'] = undefined
  export let renderOrder: Props['renderOrder'] = undefined
  export let visible: Props['visible'] = undefined

  export let autoplay: Props['autoplay'] = undefined
  export let detune: Props['detune'] = undefined
  export let buffer: Props['buffer'] = undefined
  export let url: Props['url'] = undefined
  export let volume: Props['volume'] = undefined
  export let loop: Props['loop'] = undefined
  export let filters: Props['filters'] = undefined
  export let playbackRate: Props['playbackRate'] = undefined

  export let audio: T

  let playAfterLoad = false
  let loaded = false

  export const play: Props['play'] = (delay) => {
    if (!loaded) {
      playAfterLoad = true
      return audio
    }
    audio.context.resume()
    const node = delay && typeof delay === 'number' ? audio.play(delay) : audio.play()
    setDetune(detune)
    return node
  }
  export const pause: Props['pause'] = () => audio.pause()
  export const stop: Props['stop'] = () => {
    if (!audio.source) return audio
    audio.stop()
  }

  const loader = useLoader(AudioLoader, () => new AudioLoader())

  const setDetune = (detune?: number) => {
    if (detune !== undefined && audio.source && audio.source.detune) {
      audio.setDetune(detune)
    }
  }

  $: if (autoplay !== undefined) audio.autoplay = autoplay
  $: setDetune(detune)
  $: if (volume !== undefined) audio.setVolume(volume)
  $: if (loop !== undefined) audio.setLoop(loop)
  $: if (filters !== undefined)
    Array.isArray(filters) ? audio.setFilters(filters) : audio.setFilter(filters)
  $: if (playbackRate !== undefined) audio.setPlaybackRate(playbackRate)

  const dispatch = createEventDispatcher<{
    load: AudioBuffer
    progress: ProgressEvent<EventTarget>
    error: ErrorEvent
  }>()

  const onSourceChange = (url?: string, buffer?: AudioBuffer) => {
    const isPlaying = audio.isPlaying
    loaded = false
    stop()

    if (url !== undefined && buffer !== undefined) {
      console.warn('Both properties "url" and "buffer" have been set, using property "url"')
    }

    if (url !== undefined) {
      loader.load(
        url,
        (buffer) => {
          audio.setBuffer(buffer)
          dispatch('load', buffer)
          loaded = true
          if (playAfterLoad || isPlaying) {
            play()
            playAfterLoad = false
          }
        },
        (e) => {
          dispatch('progress', e)
        },
        (e) => {
          dispatch('error', e)
        }
      )
    } else if (buffer !== undefined) {
      audio.setBuffer(buffer)
    }
  }

  $: onSourceChange(url, buffer)

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
