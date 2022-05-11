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
  export let source: Props['source'] = undefined
  export let volume: Props['volume'] = undefined
  export let loop: Props['loop'] = undefined
  export let filters: Props['filters'] = undefined
  export let playbackRate: Props['playbackRate'] = undefined

  export let audio: T

  export const play: Props['play'] = (delay) => {
    audio.context.resume()
    delay && typeof delay === 'number' ? audio.play(delay) : audio.play()
    setDetune(detune)
    return audio
  }

  export const pause: Props['pause'] = () => audio.pause()

  export const stop: Props['stop'] = () => {
    if (!audio.source) return audio
    return audio.stop()
  }

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

  const loader = useLoader(AudioLoader, () => new AudioLoader())
  const loadBufferFromUrl = (url: string): Promise<AudioBuffer> => {
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (buffer) => {
          dispatch('load', buffer)
          resolve(buffer)
        },
        (e) => {
          dispatch('progress', e)
        },
        (e) => {
          dispatch('error', e)
          reject(e)
        }
      )
    })
  }

  let previousSource: Props['source']
  const onSourceChange = async (newSource: Props['source'], signal: AbortSignal) => {
    // stop and return if the source is undefined or an empty string is provided
    if (!newSource) {
      previousSource = newSource
      stop()
      return
    }

    // stop and return if the source did not actually change
    if (!newSource || newSource === previousSource) {
      stop()
      return
    }

    previousSource = newSource

    let aborted = false
    const onAbort = () => {
      aborted = true
    }
    signal.addEventListener('abort', onAbort, { once: true })

    if (typeof newSource === 'string') {
      const buffer = await loadBufferFromUrl(newSource)
      if (aborted) return
      stop()
      audio.setBuffer(buffer)
    } else if (newSource instanceof AudioBuffer) {
      if (aborted) return
      stop()
      audio.setBuffer(newSource)
    } else if (newSource instanceof HTMLMediaElement) {
      if (aborted) return
      stop()
      audio.setMediaElementSource(newSource)
    } else if (newSource instanceof MediaStream) {
      if (aborted) return
      stop()
      audio.setMediaStreamSource(newSource)
    } else if (newSource instanceof AudioBufferSourceNode) {
      if (aborted) return
      stop()
      audio.setNodeSource(newSource)
    }

    signal.removeEventListener('abort', onAbort)
  }

  // It's possible that the source changes too quickly
  // therefore an AbortController is needed in order to
  // load the correct source after loading
  let ac: AbortController | undefined

  $: {
    if (ac) ac.abort()
    ac = new AbortController()
    onSourceChange(source, ac.signal)
  }

  onDestroy(() => {
    try {
      stop()
      if (ac) ac.abort
      if (audio.source) audio.disconnect()
    } catch (error) {
      console.warn('Error unmounting <AudioInstance>')
      console.error(error)
    }
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
