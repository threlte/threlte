<script lang="ts">
  import { T, useTask, watch } from '@threlte/core'
  import {
    InstancedMesh,
    Instance,
    OrbitControls,
    PerfMonitor,
    useGltf,
    interactivity
  } from '@threlte/extras'
  import { COLS, ROWS } from '../im2SceneConfig'

  let dn = Date.now()
  useTask(() => (dn = Date.now()))

  const gltf = useGltf('/models/threlte.glb')

  watch([gltf], (gltf) => {
    console.log(gltf)
  })

  const count = ROWS * COLS

  interactivity()
</script>

{#await gltf then value}
  <InstancedMesh
    limit={count}
    range={count}
  >
    <!-- <T is={value.scene.children[0].geometry} />
    <T is={value.scene.children[0].material} /> -->

    <T.SphereGeometry args={[2.5]} />
    <T.MeshLambertMaterial />

    {#each { length: ROWS } as _, x}
      {#each { length: COLS } as _, z}
        <Instance
          position.x={(x - ROWS / 2) * 10}
          position.y={Math.sin(x * ROWS + z + dn * 0.001)}
          position.z={(z - COLS / 2) * 10}
          color={(Math.sin(dn * 0.0001 + (x * ROWS + z) * 1000) + 1) * 0x1000000}
          onclick={(e) => {
            console.log(`clicked instance ${e.instanceId}`)
          }}
        />
      {/each}
    {/each}
  </InstancedMesh>
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
