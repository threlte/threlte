<script lang="ts">
  import { T, useThrelte } from '@threlte/core'

  const { invalidate } = useThrelte()

  const el = document.getElementById('int-target')
</script>

<T.OrthographicCamera
  zoom={80}
  position={[10, 10, 10]}
  makeDefault
  let:ref
>
  <T.OrbitControls
    args={[ref, el]}
    on:change={invalidate}
    enableZoom={false}
  />
</T.OrthographicCamera>
