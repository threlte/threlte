<script lang="ts">
  import { forwardEvents, T, useThrelte } from '@threlte/core'

  const { invalidate } = useThrelte()

  const el = document.getElementById('int-target')

  const events = forwardEvents()
</script>

<T.OrthographicCamera
  zoom={80}
  position={[10, 10, 10]}
  makeDefault
  let:ref
>
  <T.OrbitControls
    bind:this={$events}
    args={[ref, el]}
    on:change={invalidate}
    enableZoom={false}
  />
</T.OrthographicCamera>
