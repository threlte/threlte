<script
  lang="ts"
  module
>
  const createLoadOptions = (
    flipY: boolean
  ): UseLoaderLoadOptions<EXRLoader | RGBELoader | TextureLoader> => {
    return {
      transform(texture) {
        texture.flipY = flipY
        texture.mapping = EquirectangularReflectionMapping
        return texture
      }
    }
  }
</script>

<script lang="ts">
  import type { EXRLoader, RGBELoader } from 'three/examples/jsm/Addons.js'
  import type { TextureLoader } from 'three'
  import type { UseLoaderLoadOptions } from '@threlte/core'
  import { Environment, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { T } from '@threlte/core'

  type Props = {
    flipY?: boolean
    url: string
  }

  let { flipY = true, url }: Props = $props()

  const loadOptions = $derived(createLoadOptions(flipY))
</script>

<T.Mesh>
  <T.SphereGeometry />
  <T.MeshStandardMaterial
    metalness={1}
    roughness={0}
  />
</T.Mesh>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Environment
  isBackground
  {loadOptions}
  {url}
/>
