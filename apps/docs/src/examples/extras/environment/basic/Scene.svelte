<script lang="ts">
  import { Environment, OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'

  type Props = {
    autoRotateCamera?: boolean
    environmentUrl: string
    environmentIsBackground?: boolean
    isBackground?: boolean
    materialMetalness?: number
    materialRoughness?: number
    useEnvironment?: boolean
  }

  let {
    autoRotateCamera = false,
    environmentUrl,
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
  <Environment
    isBackground={environmentIsBackground}
    url={environmentUrl}
  />
{/if}
