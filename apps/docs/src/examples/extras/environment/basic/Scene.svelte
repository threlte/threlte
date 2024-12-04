<script lang="ts">
  import { Env, OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'
  import { EquirectangularReflectionMapping } from 'three'

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
    file={environmentFile}
    isBackground={environmentIsBackground}
    onloadercreated={(loader) => {
      loader.setPath(environmentPath)
    }}
  />
{/if}
