<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls } from '@threlte/extras'
  import Gizmo from '../Gizmo.svelte'
  import { MOUSE } from 'three'
</script>

<T.OrthographicCamera
  makeDefault
  near={100}
  far={10000}
  position={[0, 0, 5000]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls
    mouseButtons={{
      LEFT: MOUSE.PAN,
      RIGHT: MOUSE.ROTATE
    }}
    zoomToCursor
  />
</T.OrthographicCamera>

<T.DirectionalLight />
