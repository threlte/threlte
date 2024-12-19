<script lang="ts">
  import { Environment, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { RGBELoader } from 'three/examples/jsm/Addons.js'
  import { T, useLoader } from '@threlte/core'

  const { load } = useLoader(RGBELoader)
  const map = load('/textures/equirectangular/hdr/industrial_sunset_puresky_1k.hdr', {
    transform(texture) {
      texture.mapping = EquirectangularReflectionMapping
      return texture
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.Mesh>
  <T.MeshStandardMaterial
    metalness={1}
    roughness={0}
  />
  <T.SphereGeometry />
</T.Mesh>

{#await map then texture}
  <Environment
    isBackground
    {texture}
  />
{/await}
