<script lang="ts">
  import { T } from '@threlte/core'
  import { Tween } from 'svelte/motion'
  import type { Color } from 'three'

  type Props = {
    lightColor: Color
    machineIsOff?: boolean
    pointLightsOff?: boolean
  }

  let { machineIsOff = false, pointLightsOff = false, lightColor }: Props = $props()

  let pointLightIntensity = new Tween(0)

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
    pointLightIntensity.set(pointLightsOff ? 1 : 0)
  })

  $effect(() => {
    setTimeout(() => {
      pointLightIntensity.set(1, {
        duration: 200
      })
    }, 1000)
  })

  $effect(() => {
    blueLightIntensity.set(machineIsOff ? 2 : 2)
    redLightIntensity.set(machineIsOff ? 2 : 2)
    whiteLightIntensity.set(machineIsOff ? 0 : 0)
    whiteAmbientLightIntensity.set(machineIsOff ? 1 : 0)
  })
</script>

<!-- This PointLight replicates the light emitted by the screen -->
<T.PointLight
  args={['black']}
  position.y={1.376583185239323}
  position.z={-0.12185962320246482}
  intensity={25 * pointLightIntensity.current}
  distance={1.2}
  decay={2}
  color={lightColor}
/>

<T.AmbientLight
  intensity={8}
  color={lightColor}
/>
<T.AmbientLight
  intensity={whiteAmbientLightIntensity.current}
  color="white"
/>

<!-- Red light -->
<T.DirectionalLight
  intensity={redLightIntensity.current}
  color="#F67F55"
  position.x={-2.2}
  position.y={3.5}
  position.z={2.6}
/>

<!-- Blue light -->
<T.DirectionalLight
  intensity={blueLightIntensity.current}
  position.x={2.2}
  position.y={3.4}
  position.z={2.6}
  color="#2722F3"
/>

<!-- White light -->
<T.DirectionalLight
  intensity={whiteLightIntensity.current}
  position.x={-1}
  position.y={2.5}
  position.z={1}
  color="white"
/>
