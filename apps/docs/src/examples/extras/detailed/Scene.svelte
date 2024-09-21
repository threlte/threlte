<script lang="ts">
  import { T } from '@threlte/core'
  import { Detailed, OrbitControls } from '@threlte/extras'
  import { IcosahedronGeometry } from 'three'
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={3}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Detailed distances={[0, 5, 10]}>
  <T.Mesh
    geometry={new IcosahedronGeometry(1, 2)}
    material.wireframe={true}
    material.color={0xff_00_00}
  />
  <T.Mesh
    geometry={new IcosahedronGeometry(1, 1)}
    material.wireframe={true}
    material.color={0x00_ff_00}
  />
  />
  <T.Mesh
    geometry={new IcosahedronGeometry(1, 0)}
    material.wireframe={true}
    material.color={0x00_00_ff}
  />
</Detailed>
