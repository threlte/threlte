<script lang="ts">
  import { T, useTask, watch } from '@threlte/core'
  import {
    InstancedMesh2,
    interactivity,
    OrbitControls,
    PerfMonitor,
    useGltf
  } from '@threlte/extras'
  import { ROWS, COLS } from './im2SceneConfig'

  let dn = Date.now()
  useTask(() => (dn = Date.now()))

  const gltf = useGltf<any>('/models/threlte.glb')

  const count = ROWS * COLS

  interactivity()
</script>

{#await gltf then value}
  <InstancedMesh2 {count}>
    {#snippet children({ Instance2 })}
      <!-- <T is={value.scene.children[0].geometry} /> -->
      <!-- <T is={value.scene.children[0].material} /> -->
      <T.SphereGeometry args={[2.5]} />
      <T.MeshLambertMaterial />

      {#each { length: ROWS } as _, x}
        {#each { length: COLS } as _, z}
          <Instance2
            id={x * ROWS + z}
            x={(x - ROWS / 2) * 10}
            y={Math.sin(x * ROWS + z + dn * 0.001)}
            z={(z - COLS / 2) * 10}
            color={(Math.sin(dn * 0.0001 + (x * ROWS + z) * 1000) + 1) * 0x1000000}
            visibility={Math.sin(z * ROWS + x + dn * 0.001)}
            onclick={(e) => {
              console.log(`clicked instance ${e.instanceId}`)
            }}
          />
        {/each}
      {/each}
    {/snippet}
  </InstancedMesh2>
{/await}

<T.PerspectiveCamera
  makeDefault
  position={[45, 40, -45]}
  fov={90}
>
  <OrbitControls target.y={-10} />
</T.PerspectiveCamera>

<T.DirectionalLight
  position.y={10}
  position.z={5}
/>

<T.AmbientLight intensity={0.1} />

<PerfMonitor />
