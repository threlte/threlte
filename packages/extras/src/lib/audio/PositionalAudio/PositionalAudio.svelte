<script lang="ts">
  import { PositionalAudio as ThreePositionalAudio } from 'three'
  import AudioInstance from '../AudioInstance/AudioInstance.svelte'
  import { useThrelteAudio } from '../useThrelteAudio'
  import type { PositionalAudioProps } from './PositionalAudio.svelte'

  type $$Props = PositionalAudioProps

  export let play: $$Props['play'] = undefined
  export let pause: $$Props['pause'] = undefined
  export let stop: $$Props['stop'] = undefined

  export let id: $$Props['id'] = undefined
  export let directionalCone: $$Props['directionalCone'] = undefined
  export let refDistance: $$Props['refDistance'] = undefined
  export let rolloffFactor: $$Props['rolloffFactor'] = undefined
  export let distanceModel: $$Props['distanceModel'] = undefined
  export let maxDistance: $$Props['maxDistance'] = undefined

  const { getAudioListener } = useThrelteAudio()

  const listener = getAudioListener(id)

  if (!listener) {
    throw new Error(`No Audiolistener with id ${id} found.`)
  }

  export const audio = new ThreePositionalAudio(listener)

  $: {
    if (refDistance !== undefined) audio.setRefDistance(refDistance)
    if (rolloffFactor !== undefined) audio.setRolloffFactor(rolloffFactor)
    if (distanceModel !== undefined) audio.setDistanceModel(distanceModel)
    if (maxDistance !== undefined) audio.setMaxDistance(maxDistance)
    if (directionalCone !== undefined) {
      audio.setDirectionalCone(
        directionalCone.coneInnerAngle,
        directionalCone.coneOuterAngle,
        directionalCone.coneOuterGain
      )
    }
  }
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
