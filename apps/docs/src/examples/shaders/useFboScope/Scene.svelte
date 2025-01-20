<script lang="ts">
  import { T } from '@threlte/core'

  // world
  import { Sky } from '@threlte/extras'
  import Ducks from './world/Ducks.svelte'
  import Island from './world/Island.svelte'
  import Water from './world/Water.svelte'

  // scope
  import Controls, { baseFov } from './Controls.svelte'
  import LensView from './scope/LensView.svelte'
  import Scope from './scope/Scope.svelte'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 1.5, 20]}
  fov={baseFov}
>
  <Scope>
    {#snippet children({ ref })}
      <LensView scope={ref} />
    {/snippet}
  </Scope>
</T.PerspectiveCamera>
<Controls />

<!-- World setup -->
<Sky
  elevation={0.5}
  azimuth={130}
/>

<Water />

<Island
  scale={0.2}
  position.x={-5}
  position.y={-0.01}
  position.z={0}
/>

<Ducks />
