<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
</script>

<T.OrthographicCamera
  makeDefault
  near={44}
  far={4400}
  position={[0, 0, 3000]}
  oncreate={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls zoomToCursor />
</T.OrthographicCamera>

<T.DirectionalLight />
