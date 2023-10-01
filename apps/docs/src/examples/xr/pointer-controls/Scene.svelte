<script lang='ts'>
  import { T } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { pointerControls } from '@threlte/xr'

  interactivity()
  pointerControls()
</script>

<T.Mesh
  on:click={(event) => console.log('click', event)}
  on:contextmenu={(event) => console.log('contextmenu', event)}
  on:pointerup={(event) => console.log('pointerup', event)}
  on:pointerdown={(event) => console.log('pointerdown', event)}
>
  <T.MeshStandardMaterial />
  <T.BoxGeometry />
</T.Mesh>
