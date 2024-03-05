<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import { Sky } from '@threlte/extras'

  import Duck from './world/Duck.svelte'
  import Island from './world/Island.svelte'
  import Water from './world/Water.svelte'

  import Controls from './Controls.svelte'

  import { baseFov } from './Controls.svelte'
  import LensView from './scope/LensView.svelte'
  import Scope from './scope/Scope.svelte'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 1.5, 20]}
  fov={baseFov}
>
  <Scope let:ref>
    <LensView scope={ref} />
  </Scope>
</T.PerspectiveCamera>
<Controls />

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

<Duck />
