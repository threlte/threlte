<script lang="ts">
  import { Environment, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { T } from '@threlte/core'

  type Props = {
    flipY?: boolean
    file: string
  }

  let { flipY = true, file }: Props = $props()
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
  isBackground
  loadOptions={{
    transform(texture) {
      texture.flipY = flipY
      texture.mapping = EquirectangularReflectionMapping
    }
  }}
  resource={file}
/>
