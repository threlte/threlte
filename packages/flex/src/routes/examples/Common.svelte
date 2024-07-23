<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
</script>

<T.OrthographicCamera
  makeDefault
  near={100}
  far={10000}
  position={[0, 0, 5000]}
  oncreate={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls zoomToCursor />
</T.OrthographicCamera>

<T.DirectionalLight />
