<script lang="ts">
  import { T } from '@threlte/core'
  import { Tween } from 'svelte/motion'
  import type { Color } from 'three'

  interface Props {
    lightColor: Color
    machineIsOff?: boolean
    pointLightsOff?: boolean
  }

  let { machineIsOff = false, pointLightsOff = false, lightColor }: Props = $props()

  let pointLightIntensity = Tween.of(() => (pointLightsOff ? 1 : 0))

  const options = {
    duration: 3e3
  }

  const blueLightIntensity = Tween.of(() => (machineIsOff ? 0 : 2), options)
  const redLightIntensity = Tween.of(() => (machineIsOff ? 0 : 2), options)
  const whiteLightIntensity = Tween.of(() => (machineIsOff ? 0 : 1), options)
  const whiteAmbientLightIntensity = Tween.of(() => (machineIsOff ? 0 : 1), options)
</script>

<!-- This PointLight replicates the light emitted by the screen -->
<T.PointLight
  args={['black']}
  position.y={1.37}
  position.z={-0.12}
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
  position={[-2.2, 3.6, 2.6]}
/>

<!-- Blue light -->
<T.DirectionalLight
  intensity={blueLightIntensity.current}
  position={[2.2, 3.4, 2.6]}
  color="#2722F3"
/>

<!-- White light -->
<T.DirectionalLight
  intensity={whiteLightIntensity.current}
  position={[-1, 2.5, 1]}
  color="white"
/>
