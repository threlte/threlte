<script lang="ts">
  import { CubeEnvironment, OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'

  type Props = {
    autoRotateCamera?: boolean
    environmentFiles: [string, string, string, string, string, string]
    environmentIsBackground?: boolean
    environmentFilesPath: string
    isBackground?: boolean
    materialMetalness?: number
    materialRoughness?: number
    useEnvironment?: boolean
  }

  let {
    autoRotateCamera = false,
    environmentFiles,
    environmentIsBackground = true,
    environmentFilesPath,
    materialMetalness = 1,
    materialRoughness = 0,
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
    metalness={materialMetalness}
    roughness={materialRoughness}
  />
</T.Mesh>

{#if useEnvironment}
  <CubeEnvironment
    isBackground={environmentIsBackground}
    loaderOptions={{
      extend(loader) {
        loader.setPath(environmentFilesPath)
      }
    }}
    urls={environmentFiles}
  />
{/if}
