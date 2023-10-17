<script>
  import { writable } from 'svelte/store'
  import { T } from '@threlte/core'
  import { OrbitControls, Grid } from '@threlte/extras'
  import { useTweakpane } from '$lib/useTweakpane'
  import BirchTree_1 from '../birch1.svelte'
  import Bush1 from '../bush1.svelte'
  import Rock1 from '../rock1.svelte'

  const randomTrees = writable([])
  const randomBushes = writable([])
  const randomRocks = writable([])

  generateRandomNumbers()

  function generateRandomNumbers() {
    $randomTrees = []
    $randomBushes = []
    $randomRocks = []
    for (let i = 0; i < 10; i++) {
      $randomTrees.push([Math.random(), Math.random(), Math.random(), Math.random()])
    }
    for (let i = 0; i < 40; i++) {
      $randomBushes.push([Math.random(), Math.random(), Math.random(), Math.random()])
    }
    for (let i = 0; i < 6; i++) {
      $randomRocks.push([Math.random(), Math.random(), Math.random(), Math.random()])
    }
  }

  const { action, addButton } = useTweakpane()

  addButton({
    title: 'regenerate',
    label: 'Randomness',
    onClick: () => {
      generateRandomNumbers()
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
>
  <OrbitControls maxPolarAngle={1.57} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />
<T.AmbientLight />

<T.Mesh rotation.x={-Math.PI / 2}>
  <T.PlaneGeometry args={[20, 20, 1, 1]} />
  <T.MeshStandardMaterial color="green" />
</T.Mesh>

{#each $randomTrees as randomValues}
  {@const x = randomValues[0] * 20 - 10}
  {@const z = randomValues[1] * 20 - 10}
  {@const rot = randomValues[2] * Math.PI * 2}
  {@const scale = randomValues[3] * 2 + 1}
  <BirchTree_1
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}

{#each $randomBushes as randomValues}
  {@const x = randomValues[0] * 20 - 10}
  {@const z = randomValues[1] * 20 - 10}
  {@const rot = randomValues[2] * Math.PI * 2}
  {@const scale = randomValues[3] * 2 + 0.5}
  <Bush1
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}

{#each $randomRocks as randomValues}
  {@const x = randomValues[0] * 20 - 10}
  {@const z = randomValues[1] * 20 - 10}
  {@const rot = randomValues[2] * Math.PI * 2}
  {@const scale = randomValues[3] + 0.5}
  <Rock1
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}
