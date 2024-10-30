<script lang="ts">
  import { OrbitControls, ScreenSpace } from '@threlte/extras'
  import { T } from '@threlte/core'

  type SceneProps = {
    autoRotate: boolean
  }

  let { autoRotate = false }: SceneProps = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls
    {autoRotate}
    autoRotateSpeed={4}
  />
</T.PerspectiveCamera>

<T.AmbientLight />
<T.DirectionalLight position={3} />

<T.Mesh position.x={2}>
  <T.MeshStandardMaterial color="forestgreen" />
  <T.BoxGeometry />
</T.Mesh>

<ScreenSpace depth={-5}>
  <T.Mesh>
    <T.MeshStandardMaterial color="orangered" />
    <T.PlaneGeometry />
  </T.Mesh>
</ScreenSpace>
