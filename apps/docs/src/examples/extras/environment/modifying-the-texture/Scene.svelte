<script lang="ts">
  import { Env, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { T } from '@threlte/core'
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

<Env
  ontextureloaded={(texture) => {
    texture.flipY = false
    texture.mapping = EquirectangularReflectionMapping
    return texture
  }}
  file="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"
  isBackground
/>
