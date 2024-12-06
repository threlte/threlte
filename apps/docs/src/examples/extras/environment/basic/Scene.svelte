<script lang="ts">
  import { Environment, OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'

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
    environmentFile,
    environmentIsBackground = true,
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
  <T.TorusGeometry />
  <T.MeshStandardMaterial
    color="white"
    metalness={0.9}
    roughness={0.05}
    envMapIntensity={0.5}
  />
</T.Mesh>

{#if useEnvironment}
  <Environment
    isBackground={environmentIsBackground}
    loaderOptions={{
      extend(loader) {
        loader.setPath(environmentPath)
      }
    }}
    resource={environmentFile}
  />
{/if}
