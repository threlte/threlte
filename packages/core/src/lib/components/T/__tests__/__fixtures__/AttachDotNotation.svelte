<script lang="ts">
  import { T } from '@threlte/core'
</script>

<T.DirectionalLight name="light">
  <T.OrthographicCamera
    args={[-1, 1, 1, -1, 0.1, 100]}
    attach="shadow.camera"
  />
</T.DirectionalLight>
