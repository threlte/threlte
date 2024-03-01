<script lang="ts">
  import { Sky } from '@threlte/extras'

  import Duck from './Duck.svelte'
  import Island from './Island.svelte'
  import Water from './Water.svelte'
</script>

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
