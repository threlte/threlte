<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { Environment, OrbitControls } from '@threlte/extras'
  import type { DataTexture, Texture } from 'three'

  type Props = {
    flipY?: boolean
    url: string
  }

  let { flipY = true, url }: Props = $props()

  const { invalidate } = useThrelte()

  let texture = $state.raw<DataTexture | Texture>()

  $effect(() => {
    if (texture !== undefined) {
      texture.flipY = flipY
      texture.needsUpdate = true
      invalidate()
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

{#key url + flipY}
  <Environment
    isBackground
    {url}
    bind:texture
  />
{/key}
