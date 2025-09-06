<script lang="ts">
  import { watch } from '@threlte/core'
  import { regen, numberOfObjects } from './stores'
  // The following components started as copies from https://fun-bit.vercel.app/
  import BirchTrees from './assets/birch.svelte'
  import Trees from './assets/tree.svelte'
  import Bushes from './assets/bush.svelte'
  import Rocks from './assets/rock.svelte'

  const distinctObjects = 4
  const commonRatio = 0.5

  let randomBushes: [number, number, number, number][] = []
  let randomTrees: [number, number, number, number][] = []
  let randomBirchTrees: [number, number, number, number][] = []
  let randomRocks: [number, number, number, number][] = []

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
    const totalBushes = exponentialSumValues[0] ?? 0
    const totalTrees = exponentialSumValues[1] ?? 0
    const totalBirchTrees = exponentialSumValues[2] ?? 0
    const totalRocks = exponentialSumValues[3] ?? 0

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

<Bushes transformData={randomBushes} />

<BirchTrees transformData={randomBirchTrees} />

<Trees transformData={randomTrees} />

<Rocks transformData={randomRocks} />
