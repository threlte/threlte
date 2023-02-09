<script lang="ts">
  import { Audio as ThreeAudio } from 'three'
  import AudioInstance from '../AudioInstance/AudioInstance.svelte'
  import { useThrelteAudio } from '../useThrelteAudio'
  import type { AudioProps } from './Audio.svelte'

  type $$Props = AudioProps

  export let play: $$Props['play'] = undefined
  export let pause: $$Props['pause'] = undefined
  export let stop: $$Props['stop'] = undefined

  export let id: $$Props['id'] = undefined

  const { getAudioListener } = useThrelteAudio()

  const listener = getAudioListener(id)

  if (!listener) {
    throw new Error(`No Audiolistener with id ${id} found.`)
  }

  export const audio = new ThreeAudio(listener)
</script>

<AudioInstance
  {...$$restProps}
  on:load
  on:progress
  on:error
  bind:play
  bind:pause
  bind:stop
>
  <slot />
</AudioInstance>
