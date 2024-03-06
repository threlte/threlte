<script lang="ts">
  import { forwardEventHandlers, T, useThrelte } from '@threlte/core'

  const { invalidate } = useThrelte()

  const el = document.getElementById('int-target')

  const component = forwardEventHandlers()
</script>

<T.OrthographicCamera
  zoom={80}
  position={[10, 10, 10]}
  makeDefault
  let:ref
>
  <T.OrbitControls
    bind:this={$component}
    args={[ref, el]}
    on:change={invalidate}
    enableZoom={false}
  />
</T.OrthographicCamera>
