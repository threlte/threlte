<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { transitions, useGltf, useTexture } from '@threlte/extras'
  import { Theatre } from '@threlte/theatre'
  import { EquirectangularReflectionMapping, SRGBColorSpace } from 'three'
  import Scene from './Scene.svelte'
  import { cubeGeometry } from './state'
  import state from './state.json'

  type CubeGltf = {
    nodes: {
      Cube: THREE.Mesh
    }
    materials: {}
  }
  const cube = useGltf<CubeGltf>('/cube.glb')

  $: if ($cube) cubeGeometry.set($cube.nodes.Cube.geometry)

  const env = useTexture('/oil-on-water.png')

  const { scene } = useThrelte()
  $: if ($env) {
    $env.mapping = EquirectangularReflectionMapping
    $env.colorSpace = SRGBColorSpace
    scene.environment = $env
  }

  transitions()
</script>

{#if $cubeGeometry && $env}
  <Scene />
{/if}
