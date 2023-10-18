<script>
  import { writable } from 'svelte/store'
  import { T, watch } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { regen, numberOfObjects } from './state'
  import BirchTree1 from '../birch1.svelte'
  import Tree1 from '../tree1.svelte'
  import Bush1 from '../bush1.svelte'
  import Rock1 from '../rock1.svelte'

  const distinctObjects = 4
  const commonRatio = 0.5

  let randomBushes = []
  let randomTrees = []
  let randomBirchTrees = []
  let randomRocks = []

  watch([regen, numberOfObjects], () => {
    generateRandomNumbers()
  })

  generateRandomNumbers()

  function generateRandomNumbers() {
    const exponentialSumValues = calculateExponentialSumValues(
      $numberOfObjects,
      distinctObjects,
      commonRatio
    )
    const totalBushes = exponentialSumValues[0]
    const totalTrees = exponentialSumValues[1]
    const totalBirchTrees = exponentialSumValues[2]
    const totalRocks = exponentialSumValues[3]

    randomBushes = []
    randomTrees = []
    randomBirchTrees = []
    randomRocks = []

    for (let i = 0; i < totalBushes; i++) {
      randomBushes.push([Math.random(), Math.random(), Math.random(), Math.random()])
      if (i < totalTrees) {
        randomTrees.push([Math.random(), Math.random(), Math.random(), Math.random()])
      }
      if (i < totalBirchTrees) {
        randomBirchTrees.push([Math.random(), Math.random(), Math.random(), Math.random()])
      }
      if (i < totalRocks) {
        randomRocks.push([Math.random(), Math.random(), Math.random(), Math.random()])
      }
    }
  }

  function calculateExponentialSumValues(total, numberOfValues, commonRatio) {
    let result = []
    let remainingTotal = total

    for (let i = 0; i < numberOfValues - 1; i++) {
      let term = Math.ceil(remainingTotal * (1 - commonRatio))
      result.push(term)
      remainingTotal -= term
    }

    // The last term to ensure the sum is exactly equal to the total
    result.push(remainingTotal)

    return result
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position={[20, 20, 20]}
>
  <OrbitControls
    maxPolarAngle={1.57}
    autoRotate
    autoRotateSpeed={0.1}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />
<T.AmbientLight />

<T.Mesh rotation.x={-Math.PI / 2}>
  <T.PlaneGeometry args={[20, 20, 1, 1]} />
  <T.MeshStandardMaterial color="green" />
</T.Mesh>

{#each randomBushes as randomValues}
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

{#each randomBirchTrees as randomValues}
  {@const x = randomValues[0] * 20 - 10}
  {@const z = randomValues[1] * 20 - 10}
  {@const rot = randomValues[2] * Math.PI * 2}
  {@const scale = randomValues[3] * 2 + 1}
  <BirchTree1
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}

{#each randomTrees as randomValues}
  {@const x = randomValues[0] * 20 - 10}
  {@const z = randomValues[1] * 20 - 10}
  {@const rot = randomValues[2] * Math.PI * 2}
  {@const scale = randomValues[3] * 2 + 1}
  <Tree1
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}

{#each randomRocks as randomValues}
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
