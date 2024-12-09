<script lang="ts">
  import type { UseLoaderLoadOptions } from '@threlte/core'
  import type { RGBELoader } from 'three/examples/jsm/Addons.js'
  import { Environment, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { T } from '@threlte/core'

  type Props = {
    flipY?: boolean
    url: string
  }

  let { flipY = true, url }: Props = $props()

  const createLoadOptions = (flipY: boolean): UseLoaderLoadOptions<RGBELoader> => {
    return {
      transform(texture) {
        texture.flipY = flipY
        texture.mapping = EquirectangularReflectionMapping
      }
    }
  }

  const loadOptions: UseLoaderLoadOptions<RGBELoader> = $derived(createLoadOptions(flipY))
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
  resource={url}
/>
