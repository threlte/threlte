<script lang="ts">
  import { T } from '@threlte/core'
  import { StaticState } from '@threlte/studio'
  import { useStaticState } from '@threlte/studio/extensions'
  import Box from './Box.svelte'
  import Icosahedron from './Icosahedron.svelte'
  import Sphere from './Sphere.svelte'

  const staticStateExtension = useStaticState()
  staticStateExtension.enableEditor()

  class SceneConfig extends StaticState {
    /**
     * @min 1.5
     * @max 5
     */
    gap = $state(2)
  }

  const sceneConfig = new SceneConfig()
</script>

<Icosahedron position={[-sceneConfig.gap, 0, 0]} />
<Box position={[0, 0, 0]} />
<Sphere position={[sceneConfig.gap, 0, 0]} />

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
  intensity={2.7}
/>

<T.AmbientLight intensity={0.13} />
