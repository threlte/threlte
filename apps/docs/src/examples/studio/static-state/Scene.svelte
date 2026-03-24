<script lang="ts">
  import { T } from '@threlte/core'
  import { useStaticState } from '@threlte/studio/extensions'
  import Box from './Box.svelte'
  import { SceneConfig } from './config.svelte'
  import Icosahedron from './Icosahedron.svelte'
  import Sphere from './Sphere.svelte'

  const staticStateExtension = useStaticState()
  staticStateExtension.enableEditor()

  const config = new SceneConfig()
</script>

<T.PerspectiveCamera
  makeDefault
  fov={33.75}
  position={[0, 2, 10]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<T.DirectionalLight
  position={[3, 10, 7]}
  intensity={config.directionalLightIntensity}
/>

<T.AmbientLight intensity={config.ambientLightIntensity} />

<Icosahedron position={[-2, 0, 0]} />
{#if config.showBox}
  <Box position={[0, 0, 0]} />
{/if}
<Sphere position={[2, 0, 0]} />
