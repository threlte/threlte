<script lang="ts">
  import { T } from '@threlte/core'
</script>

<T.DirectionalLight name="light">
  <T.OrthographicCamera
    attach="shadow.camera"
    args={[-10, 10, 10, -10]}
    name="shadow-camera"
    manual
  />
</T.DirectionalLight>
