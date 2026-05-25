<script lang="ts">
  import { T } from '@threlte/core'
  import { Audio } from 'three'
  import { useAudio } from '../utils/useAudio.svelte.js'
  import { useThrelteAudio } from '../useThrelteAudio.js'
  import type { AudioProps } from './types.js'

  let {
    id,
    src,
    autoplay = false,
    loop = false,
    volume = 1,
    playbackRate = 1,
    detune = 0,
    ref = $bindable(),
    children,
    ...rest
  }: AudioProps = $props()

  const { getAudioListener } = useThrelteAudio()

  const listener = $derived(getAudioListener(id))

  $effect(() => {
    if (!listener) {
      console.warn(`No Audiolistener with id ${id} found.`)
    }
  })

  const audio = $derived(listener ? new Audio<GainNode>(listener) : undefined)

  export const { pause, play, stop } = useAudio(
    () => audio,
    () => src,
    () => autoplay,
    () => loop,
    () => volume,
    () => playbackRate,
    () => detune,
    () => rest
  )
</script>

{#if audio}
  <T
    is={audio}
    bind:ref
    {...rest}
  >
    {@render children?.({ ref: audio })}
  </T>
{/if}
