<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import Hud from './Hud.svelte'
</script>

<T.PerspectiveCamera
  position={[10, 5, 10]}
  makeDefault
  fov={30}
>
  <OrbitControls enableZoom={false} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<T.AmbientLight intensity={0.3} />

<T.GridHelper />

<Hud />
