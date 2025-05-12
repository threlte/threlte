<script lang="ts">
  import { watch } from '@threlte/core'
  import { radius, regen, width, height } from './stores'
  import { PoissonDiscSample as Sampler, type Point } from './sampling'
  // The following components started as copies from https://fun-bit.vercel.app/
  import Trees from './assets/tree.svelte'
  import Bushes from './assets/bush.svelte'
  import Rocks from './assets/rock.svelte'

  const pointsMatrix = [
    { radius: 6, desription: 'large', density: 15 },
    { radius: 4, desription: 'medium', density: 35 },
    { radius: 2, desription: 'small', density: 50 }
  ]

  let sampler = new Sampler(pointsMatrix, { width, height }, undefined, Math.random)
  let points: Point[] = sampler.generatePoints()
  let smallObjects: [number, number, number, number][] = points
    .filter((obj) => obj.desription == 'small')
    .map((value) => {
      return [value.x, value.y, Math.random(), Math.random()]
    })
  let mediumObjects: [number, number, number, number][] = points
    .filter((obj) => obj.desription == 'medium')
    .map((value) => {
      return [value.x, value.y, Math.random(), Math.random()]
    })
  let largeObjects: [number, number, number, number][] = points
    .filter((obj) => obj.desription == 'large')
    .map((value) => {
      return [value.x, value.y, Math.random(), Math.random()]
    })

  watch([regen, radius], () => {
    sampler = new Sampler(pointsMatrix, { width, height }, undefined, Math.random)
    points = sampler.generatePoints()
    smallObjects = points
      .filter((obj) => obj.desription == 'small')
      .map((value) => {
        return [value.x, value.y, Math.random(), Math.random()]
      })
    mediumObjects = points
      .filter((obj) => obj.desription == 'medium')
      .map((value) => {
        return [value.x, value.y, Math.random(), Math.random()]
      })
    largeObjects = points
      .filter((obj) => obj.desription == 'large')
      .map((value) => {
        return [value.x, value.y, Math.random(), Math.random()]
      })
  })
</script>

<Bushes transformData={smallObjects} />
<Trees transformData={mediumObjects} />

<Rocks transformData={largeObjects} />
