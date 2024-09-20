<script lang="ts">
  import { T, useThrelte } from '@threlte/core'

  const { invalidate } = useThrelte()

  const el = document.getElementById('int-target')
</script>

<T.OrthographicCamera
  zoom={80}
  position={[10, 10, 10]}
  makeDefault
>
  {#snippet children({ ref })}
    <T.OrbitControls
      args={[ref, el]}
      onchange={invalidate}
      enableZoom={false}
    />
  {/snippet}
</T.OrthographicCamera>
