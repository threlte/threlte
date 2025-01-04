<script>
  import { T } from '@threlte/core'
  import { Instance, InstancedMesh } from '@threlte/extras'
  import { SceneConfig } from './config.svelte'

  const s = new SceneConfig()

  const countFloor = $derived({
    x: Math.max(Math.floor(s.grid.x), 1),
    y: Math.max(Math.floor(s.grid.y), 1)
  })

  const center = $derived({
    x: countFloor.x * -1 + 1,
    y: countFloor.y * -1 + 1
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[s.camera.x, s.camera.y, s.camera.z]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0)
  }}
/>

<T.DirectionalLight position={[3, 10, 7]} />

<T.Group position={[center.x, center.y, 0]}>
  <InstancedMesh>
    <T.BoxGeometry />
    <T.MeshStandardMaterial color={s.color} />

    {#each { length: countFloor.x } as _, i (i)}
      {#each { length: countFloor.y } as _, j (j)}
        <Instance position={[i * 2, j * 2, 0]} />
      {/each}
    {/each}
  </InstancedMesh>
</T.Group>
