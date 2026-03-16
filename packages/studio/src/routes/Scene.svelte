<script>
  import { T } from '@threlte/core'
  import { Instance, InstancedMesh, RoundedBoxGeometry } from '@threlte/extras'
  import { BaseConfig } from './config.svelte.js'
  import { StaticState } from '@threlte/studio'

  class SceneConfig extends StaticState {
    /**
     * @min 0
     * @max 5
     * @step 1
     */
    grid = $state({ x: 5, y: 5 })
    color = $state('#fe3d00')
    camera = $state({ x: 0, y: 4, z: 22 })
  }

  const baseConfig = new BaseConfig()
  const sceneConfig = new SceneConfig()

  const countFloor = $derived({
    x: Math.max(Math.floor(sceneConfig.grid.x), 1),
    y: Math.max(Math.floor(sceneConfig.grid.y), 1)
  })

  const center = $derived({
    x: countFloor.x * -1 + 1,
    y: countFloor.y * -1 + 1
  })
</script>

<T.PerspectiveCamera
  position={[ 0, 2, 22 ]}
  makeDefault
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0)
  }}
/>

<T.DirectionalLight
  position={[3, 10, 7]}
  intensity={Math.PI}
/>

<T.Group position={[center.x, center.y, 0]}>
  <InstancedMesh>
    <RoundedBoxGeometry
      radius={0.2}
      args={[1.5, 1.5, 1.5]}
    />
    <T.MeshStandardMaterial
      color={sceneConfig.color}
      transparent
      opacity={baseConfig.opacity}
      alphaToCoverage
    />

    {#each { length: countFloor.x } as _, i (i)}
      {#each { length: countFloor.y } as _, j (j)}
        <Instance position={[i * 2, j * 2, 0]} />
      {/each}
    {/each}
  </InstancedMesh>
</T.Group>
