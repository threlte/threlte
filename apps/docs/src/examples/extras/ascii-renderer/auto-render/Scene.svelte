<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'

  /** disable orbit controls when the ascii renderer is paused to avoid jumps */

  type SceneProps = {
    orbitControlsEnabled: boolean
  }

  let { orbitControlsEnabled }: SceneProps = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls enabled={orbitControlsEnabled} />
</T.PerspectiveCamera>

<T.Mesh>
  <T.MeshNormalMaterial />
  <T.TorusKnotGeometry />
</T.Mesh>
