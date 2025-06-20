<script lang="ts">
  import { types } from '@theatre/core'
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
  const cube = useGltf<CubeGltf>('/cube.glb')

  $: if ($cube) cubeGeometry.set($cube.nodes.Cube.geometry)

  const env = useTexture('/oil-on-water.png')

  const { scene } = useThrelte()
  const cube = useGltf<CubeGltf>('/cube.glb')
  const env = useTexture('/oil-on-water.png', {
    transform: (t) => {
      t.mapping = EquirectangularReflectionMapping
      t.colorSpace = SRGBColorSpace
      return t
    }
  })

  cube.then((gltf) => {
    cubeGeometry.set(gltf.nodes.Cube.geometry)
  })
  env.then((texture) => {
    scene.environment = texture
    scene.environmentIntensity = 10
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
        x: types.number(0, { range: [0, 5] }),
        y: types.number(0, { range: [0, 5] }),
        z: types.number(0, { range: [0, 5] })
      }
    }}
    onchange={(values) => {
      scene.environmentRotation.x = values.rotation.x
      scene.environmentRotation.y = values.rotation.y
      scene.environmentRotation.z = values.rotation.z
    }}
  />
</ScrollSheet>

{#if $cubeGeometry && $env}
  <Scene />
{/if}
