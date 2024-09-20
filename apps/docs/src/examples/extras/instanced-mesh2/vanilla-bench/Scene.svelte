<script lang="ts">
  import { T, useTask, watch } from '@threlte/core'
  import { InstancedMesh, Instance, OrbitControls, PerfMonitor, useGltf } from '@threlte/extras'

  let dn = Date.now()
  useTask(() => (dn = Date.now()))

  const gltf = useGltf('/models/threlte.glb')

  watch([gltf], (gltf) => {
    console.log(gltf)
  })

  const w = 100
  const h = 100

  const count = w * h
</script>

{#await gltf then value}
  <InstancedMesh
    limit={count}
    range={count}
  >
    <T is={value.scene.children[0].geometry} />
    <T is={value.scene.children[0].material} />

    {#each { length: w } as _, x}
      {#each { length: h } as _, z}
        <Instance
          position.x={(x - w / 2) * 10}
          position.y={Math.sin(x * w + z + dn * 0.001)}
          position.z={(z - h / 2) * 10}
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
