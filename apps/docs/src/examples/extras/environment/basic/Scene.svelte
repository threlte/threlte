<script lang="ts">
  import { T } from '@threlte/core'
  import { Env, OrbitControls } from '@threlte/extras'

  type Props = {
    autoRotateCamera?: boolean
    isBackground?: boolean
    environmentIsBackground?: boolean
    environmentPath: string
    environmentFile: string
    useEnvironment?: boolean
  }

  let {
    autoRotateCamera = true,
    environmentIsBackground = true,
    environmentFile,
    environmentPath,
    useEnvironment = true
  }: Props = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls autoRotate={autoRotateCamera} />
</T.PerspectiveCamera>

<T.Mesh>
  <T.SphereGeometry />
  <T.MeshStandardMaterial
    color="white"
    metalness={0.9}
    roughness={0.05}
    envMapIntensity={0.5}
  />
</T.Mesh>

{#if useEnvironment}
  <Env
    path={environmentPath}
    file={environmentFile}
    isBackground={environmentIsBackground}
  />
{/if}
