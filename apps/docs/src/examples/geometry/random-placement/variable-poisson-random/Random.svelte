<script lang="ts">
  import { width, height } from './stores'
  import { PoissonDiscSample as Sampler } from './sampling'
  // The following components started as copies from https://fun-bit.vercel.app/
  import Trees from './assets/tree.svelte'
  import Bushes from './assets/bush.svelte'
  import Rocks from './assets/rock.svelte'

  const pointsMatrix = [
    { radius: 6, desription: 'large', density: 15 },
    { radius: 4, desription: 'medium', density: 35 },
    { radius: 2, desription: 'small', density: 50 }
  ]

  const sampler = new Sampler(pointsMatrix, { width, height }, undefined, Math.random)
  const points = sampler.generatePoints()

  const smallObjects = $derived<[number, number, number, number][]>(
    points
      .filter((obj) => obj.desription == 'small')
      .map((value) => {
        return [value.x, value.y, Math.random(), Math.random()]
      })
  )

  const mediumObjects = $derived<[number, number, number, number][]>(
    points
      .filter((obj) => obj.desription == 'medium')
      .map((value) => {
        return [value.x, value.y, Math.random(), Math.random()]
      })
  )

  const largeObjects = $derived<[number, number, number, number][]>(
    points
      .filter((obj) => obj.desription == 'large')
      .map((value) => {
        return [value.x, value.y, Math.random(), Math.random()]
      })
  )
</script>

<Bushes transformData={smallObjects} />
<Trees transformData={mediumObjects} />
<Rocks transformData={largeObjects} />
