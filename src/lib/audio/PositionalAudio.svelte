<script lang="ts">
  import { PositionalAudio } from 'three'
  import { useThrelteAudio } from '../hooks/useThrelteAudio'
  import AudioInstance from '../instances/AudioInstance.svelte'
  import type { PositionalAudioProperties } from '../types/components'

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
  export let filters: PositionalAudioProperties['filters'] = undefined
  export let playbackRate: PositionalAudioProperties['playbackRate'] = undefined

  export let play: PositionalAudioProperties['play'] = undefined
  export let pause: PositionalAudioProperties['pause'] = undefined
  export let stop: PositionalAudioProperties['stop'] = undefined

  export let id: PositionalAudioProperties['id'] = undefined
  export let directionalCone: PositionalAudioProperties['directionalCone'] = undefined
  export let refDistance: PositionalAudioProperties['refDistance'] = undefined
  export let rolloffFactor: PositionalAudioProperties['rolloffFactor'] = undefined
  export let distanceModel: PositionalAudioProperties['distanceModel'] = undefined
  export let maxDistance: PositionalAudioProperties['maxDistance'] = undefined

  const { getAudioListener } = useThrelteAudio()

  const listener = getAudioListener(id)

  if (!listener) {
    throw new Error(`No Audiolistener with id ${id} found.`)
  }

  export const audio = new PositionalAudio(listener)

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
  {audio}
  {position}
  {filters}
  {playbackRate}
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
  on:load
  on:progress
  on:error
  bind:play
  bind:pause
  bind:stop
>
  <slot />
</AudioInstance>
