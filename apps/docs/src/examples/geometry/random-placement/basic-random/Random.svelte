<script lang="ts">
  import { watch } from '@threlte/core'
  import { regen, numberOfObjects } from './stores'
  // The following components are copies from https://fun-bit.vercel.app/
  import BirchTree from './assets/birch.svelte'
  import Tree from './assets/tree.svelte'
  import Bush from './assets/bush.svelte'
  import Rock from './assets/rock.svelte'

  const distinctObjects = 4
  const commonRatio = 0.5

  let randomBushes: number[][] = []
  let randomTrees: number[][] = []
  let randomBirchTrees: number[][] = []
  let randomRocks: number[][] = []

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

  function calculateExponentialSumValues(
    total: number,
    numberOfValues: number,
    commonRatio: number
  ): number[] {
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

{#each randomBushes as randomValues}
  {@const x = randomValues[0] * 20 - 10}
  {@const z = randomValues[1] * 20 - 10}
  {@const rot = randomValues[2] * Math.PI * 2}
  {@const scale = randomValues[3] * 2 + 0.5}
  <Bush
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
  <BirchTree
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
  <Tree
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
  <Rock
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}
