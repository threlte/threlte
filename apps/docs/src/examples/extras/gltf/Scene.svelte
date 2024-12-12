<script lang="ts">
  import { T } from '@threlte/core'
  import { Environment, GLTF, OrbitControls } from '@threlte/extras'
</script>

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<T.PerspectiveCamera
  makeDefault
  position={[5, 2, 5]}
  fov={25}
>
  <OrbitControls
    autoRotate
    enableDamping
  />
</T.PerspectiveCamera>

<T.AmbientLight />

<GLTF url="/models/helmet/DamagedHelmet.gltf" />
