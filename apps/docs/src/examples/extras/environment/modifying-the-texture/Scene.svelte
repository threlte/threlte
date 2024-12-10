<script lang="ts">
  import { DataTexture, Texture } from 'three'
  import { Environment, OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'

  type Props = {
    flipY?: boolean
    url: string
  }

  let { flipY = true, url }: Props = $props()

  let texture: DataTexture | Texture | undefined = $state()

  $effect(() => {
    if (texture !== undefined) {
      texture.flipY = flipY
    }
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
  isBackground
  resource={url}
  bind:texture
/>
