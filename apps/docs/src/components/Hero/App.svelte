<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { useGltf, useTexture } from '@threlte/extras'
  import { SheetObject } from '@threlte/theatre'
  import type { Mesh } from 'three'
  import { EquirectangularReflectionMapping, SRGBColorSpace } from 'three'
  import Scene from './Scene.svelte'
  import ScrollSheet from './ScrollSheet.svelte'
  import { cubeGeometry } from './state'

  type CubeGltf = {
    nodes: {
      Cube: Mesh
    }
    materials: {}
  }

  const { scene } = useThrelte()
  const cube = useGltf<CubeGltf>('/cube.glb')
  const env = useTexture('/oil-on-water.png', {
    transform(texture) {
      texture.mapping = EquirectangularReflectionMapping
      texture.colorSpace = SRGBColorSpace

      scene.environment = texture
      scene.environmentIntensity = 10
    }
  })

  $effect(() => {
    if (cube.current) {
      cubeGeometry.set(cube.current.nodes.Cube.geometry)
    }
  })
</script>

<ScrollSheet
  name="Environment"
  startAtScrollPosition={0}
  endAtScrollPosition={5}
  useSpring
>
  <SheetObject
    key="Settings"
    props={{
      rotation: {
        x: 0,
        y: 0,
        z: 0
      }
    }}
    onchange={(values) => {
      scene.environmentRotation.x = values.rotation.x
      scene.environmentRotation.y = values.rotation.y
      scene.environmentRotation.z = values.rotation.z
    }}
  />
</ScrollSheet>

{#if cube.current && env.current}
  <Scene />
{/if}
