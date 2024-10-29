<script lang="ts">
  import { OrbitControls, Resize, useGltf } from '@threlte/extras'
  import { T } from '@threlte/core'

  type SceneProps = {
    resize?: boolean
  }

  let { resize = true }: SceneProps = $props()

  const names = ['Duck', 'Flower', 'Fox']

  const promises = Promise.all(names.map((name) => useGltf(`/models/${name}.glb`)))

  const increment = (2 * Math.PI) / names.length
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 5]}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.2} />
<T.DirectionalLight position={[1, 5, 3]} />

{#await promises then objects}
  {#each objects as { scene }, i}
    {@const r = increment * i}
    <T.Group
      position.x={Math.cos(r)}
      position.z={Math.sin(r)}
    >
      {#if resize}
        <Resize>
          <T is={scene} />
        </Resize>
      {:else}
        <T is={scene} />
      {/if}
    </T.Group>
  {/each}
{/await}
