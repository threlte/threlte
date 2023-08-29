<script lang='ts'>

import { T, useThrelte } from '@threlte/core'
import { interactivity } from '@threlte/extras'
import { XR, Controllers, Hands, PointerControls } from '$lib'

const { camera } = useThrelte()

camera.current.position.z = 1.75
camera.current.lookAt(0, 1.75, 1)

interactivity()

</script>

<XR>
  <Controllers />
  <Hands />
</XR>

<PointerControls>
  <T.Mesh
    on:pointerenter={() => console.log('pointerenter')}
    on:pointerleave={() => console.log('pointerleave')}
    on:click={() => console.log('click')}
  >
    <T.BoxGeometry />
    <T.MeshBasicMaterial />
  </T.Mesh>

  <T.Mesh>
    <T.PlaneGeometry />
    <T.MeshBasicMaterial />
  </T.Mesh>

  <T.AmbientLight />
  <T.DirectionalLight />
</PointerControls>
