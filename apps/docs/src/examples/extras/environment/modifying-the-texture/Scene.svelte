<script lang="ts">
  import { Environment, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping, Texture } from 'three'
  import { T } from '@threlte/core'

  type Props = {
    flipY?: boolean
    file: string
  }

  let { flipY = true, file }: Props = $props()

  const ontextureloaded: (texture: Texture) => void = $derived((texture) => {
    texture.flipY = flipY
    texture.mapping = EquirectangularReflectionMapping
  })
</script>

<T.Mesh>
  <T.SphereGeometry />
  <T.MeshStandardMaterial
    metalness={1}
    roughness={0}
  />
</T.Mesh>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Environment
  {ontextureloaded}
  {file}
  isBackground
/>
