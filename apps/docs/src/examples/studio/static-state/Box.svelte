<script lang="ts">
  import { T, type Props } from '@threlte/core'
  import { RoundedBoxGeometry } from '@threlte/extras'
  import type { Mesh } from 'three'
  import { SceneConfig } from './config.svelte'

  let { ...props }: Props<typeof Mesh> = $props()

  const sceneConfig = new SceneConfig()
</script>

<T.Mesh {...props}>
  <RoundedBoxGeometry
    radius={0.3}
    args={[1.3, 1.3, 1.3]}
  />
  <T.MeshStandardMaterial
    color={sceneConfig.color}
    transparent
    opacity={sceneConfig.opacity}
    alphaToCoverage
  />
</T.Mesh>
