<script lang="ts">
  import { T, type Props } from '@threlte/core'
  import type { Mesh } from 'three'
  import { SceneConfig } from './config.svelte'

  let { ...props }: Props<typeof Mesh> = $props()

  const sceneConfig = new SceneConfig()
</script>

<T.Mesh {...props}>
  <T.SphereGeometry args={[0.8]} />
  <T.MeshStandardMaterial
    color={sceneConfig.color}
    transparent
    opacity={sceneConfig.opacity}
    alphaToCoverage
  />
</T.Mesh>
