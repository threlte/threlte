<script lang="ts">
  import { Environment, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { RGBELoader } from 'three/examples/jsm/Addons.js'
  import { T, useLoader, useThrelte } from '@threlte/core'

  const { load } = useLoader(RGBELoader)

  const map = load('/textures/equirectangular/hdr/shanghai_riverside_1k.hdr', {
    transform(texture) {
      texture.mapping = EquirectangularReflectionMapping
      return texture
    }
  })

  const { camera } = useThrelte()
</script>

<OrbitControls attach={camera.current} />

<T.Mesh>
  <T.MeshStandardMaterial
    metalness={1}
    roughness={0}
  />
  <T.SphereGeometry />
</T.Mesh>

{#await map then resource}
  <Environment
    isBackground
    {resource}
  />
{/await}
