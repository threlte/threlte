<script lang="ts">
  import { T, useThrelte } from '@threlte/core'

  import { interactivity, Sky } from '@threlte/extras'

  import DeathValley from './deathValley.svelte'
  import { Vector3 } from 'three'

  interactivity()

  const { camera } = useThrelte()

  $: {
    $camera.lookAt(new Vector3(0, 0, 0))
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position={[1, 0.5, 1]}
  fov={80}
/>

<Sky />
<DeathValley />
