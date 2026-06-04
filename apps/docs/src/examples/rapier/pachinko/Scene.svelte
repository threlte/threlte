<script lang="ts">
  import { T } from '@threlte/core'
  import { Bounds, SoftShadows } from '@threlte/extras'
  import { Debug } from '@threlte/rapier'
  import Balls from './Balls.svelte'
  import Cabinet from './Cabinet.svelte'
  import ControlPanelHUD from './ControlPanelHUD.svelte'
  import Frame from './Frame.svelte'
  import Launcher from './Launcher.svelte'
  import Pegs from './Pegs.svelte'
  import Pockets from './Pockets.svelte'
  import Windmills from './Windmills.svelte'
  import { CABINET_WIDTH, CROWN_Y, FIELD_HEIGHT } from './gameState.svelte'

  interface Props {
    debug: boolean
  }

  let { debug }: Props = $props()
</script>

<SoftShadows />

<T.DirectionalLight
  position={[4, 8, 6]}
  intensity={2}
  castShadow
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
  shadow.camera.top={CROWN_Y + 1}
  shadow.camera.bottom={-FIELD_HEIGHT}
  shadow.camera.left={-CABINET_WIDTH}
  shadow.camera.right={CABINET_WIDTH}
/>
<T.AmbientLight intensity={0.4} />
<T.PointLight
  position={[0, 0, 4]}
  intensity={20}
  color="#ff4488"
  distance={12}
/>

<!-- Starting orientation. -->
<T.PerspectiveCamera
  makeDefault
  fov={40}
  position={[3, 0, 18]}
/>

<Bounds
  animate={false}
  margin={0.1}
>
  <Cabinet />
  <Frame />
  <Pegs />
  <Windmills />
  <Pockets />
  <Launcher />
  <ControlPanelHUD />
</Bounds>

<Balls />

{#if debug}
  <Debug />
{/if}
