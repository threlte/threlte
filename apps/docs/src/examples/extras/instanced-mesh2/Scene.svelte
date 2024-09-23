<script lang="ts">
  import { T, useTask, watch } from '@threlte/core'
  import { InstancedMesh2, OrbitControls, PerfMonitor, useGltf } from '@threlte/extras'

  let dn = Date.now()
  useTask(() => (dn = Date.now()))

  const gltf = useGltf<any>('/models/threlte.glb')

  watch([gltf], (gltf) => {
    console.log(gltf)
  })

  const w = 100
  const h = 100

  const count = w * h
</script>

{#await gltf then value}
  <InstancedMesh2 {count}>
    {#snippet children({ Instance2 })}
      <T is={value.scene.children[0].geometry} />
      <T is={value.scene.children[0].material} />

      {#each { length: w } as _, x}
        {#each { length: h } as _, z}
          <Instance2
            id={x * w + z}
            x={(x - w / 2) * 10}
            y={Math.sin(x * w + z + dn * 0.001)}
            z={(z - h / 2) * 10}
            visibility={Math.sin(z * w + x + dn * 0.001) > 0}
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
