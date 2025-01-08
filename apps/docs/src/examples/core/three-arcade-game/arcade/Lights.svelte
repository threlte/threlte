<script lang="ts">
  import { T } from '@threlte/core'
  import type { PointLight } from 'three'
  import { Tween } from 'svelte/motion'
  import { gameState } from '../game/state'

  const { state, averageScreenColor } = gameState

  let pointlight: PointLight
  let nodes = undefined

  let basePointLightIntensity = new Tween(0)

  let pointLightIntensity = basePointLightIntensity

  let machineIsOff = $derived($state === 'off' ? true : false)

  const blueLightIntensity = new Tween(2, {
    duration: 3e3
  })

  const redLightIntensity = new Tween(1, {
    duration: 3e3
  })

  const whiteLightIntensity = new Tween(0, {
    duration: 3e3
  })

  const whiteAmbientLightIntensity = new Tween(1, {
    duration: 3e3
  })

  $effect(() => {
    blueLightIntensity.set(machineIsOff ? 2 : 2)
    redLightIntensity.set(machineIsOff ? 2 : 2)
    whiteLightIntensity.set(machineIsOff ? 0 : 0)
    whiteAmbientLightIntensity.set(machineIsOff ? 1 : 0)
  })
</script>

<!-- This PointLight replicates the light emitted by the screen -->
{#if nodes}
  <T.PointLight
    args={['black']}
    position.y={1.376583185239323}
    position.z={-0.12185962320246482}
    intensity={25 * pointLightIntensity}
    distance={1.2}
    decay={2}
    color={averageScreenColor}
    bind:ref={pointlight}
  />
{/if}

<T.AmbientLight
  intensity={8}
  color={averageScreenColor}
/>
<T.AmbientLight
  intensity={whiteAmbientLightIntensity}
  color={'white'}
/>

<!-- Red light -->
<T.DirectionalLight
  intensity={redLightIntensity}
  color="#F67F55"
  position.x={-2.2}
  position.y={3.5}
  position.z={2.6}
/>

<!-- Blue light -->
<T.DirectionalLight
  intensity={blueLightIntensity}
  position.x={2.2}
  position.y={3.4}
  position.z={2.6}
  color="#2722F3"
/>

<!-- White light -->
<T.DirectionalLight
  intensity={whiteLightIntensity}
  position.x={-1}
  position.y={2.5}
  position.z={1}
  color="white"
/>
