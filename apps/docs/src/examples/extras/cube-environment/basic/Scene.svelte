<script lang="ts">
  import { CubeEnvironment, OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'

  type Props = {
    autoRotateCamera?: boolean
    environmentUrls: [string, string, string, string, string, string]
    environmentIsBackground?: boolean
    materialMetalness?: number
    materialRoughness?: number
    useEnvironment?: boolean
  }

  let {
    autoRotateCamera = false,
    environmentUrls,
    environmentIsBackground = true,
    materialMetalness = 1,
    materialRoughness = 0,
    useEnvironment = true
  }: Props = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls
    autoRotate={autoRotateCamera}
    autoRotateSpeed={0.15}
    enableDamping
  />
</T.PerspectiveCamera>

<T.Mesh>
  <T.TorusGeometry args={[1, 0.4, 36, 192]} />
  <T.MeshStandardMaterial
    metalness={materialMetalness}
    roughness={materialRoughness}
  />
</T.Mesh>

{#if useEnvironment}
  <CubeEnvironment
    isBackground={environmentIsBackground}
    urls={environmentUrls}
  />
{/if}
