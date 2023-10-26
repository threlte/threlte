<script lang="ts">
  import { watch } from '@threlte/core'
  import { radius, regen, width, height } from './stores'
  import { PoissonDiscSample as Sampler, type Point } from './sampling'
  // The following components are copies from https://fun-bit.vercel.app/
  import Tree from './assets/tree.svelte'
  import Bush from './assets/bush.svelte'
  import Rock from './assets/rock.svelte'

  const pointsMatrix = [
    { radius: 6, desription: 'large', density: 15 },
    { radius: 4, desription: 'medium', density: 35 },
    { radius: 2, desription: 'small', density: 50 }
  ]

  let sampler = new Sampler(pointsMatrix, { width, height }, undefined, Math.random)
  let points: Point[] = sampler.generatePoints()
  let smallObjects = points.filter((obj) => obj.desription == 'small')
  let mediumObjects = points.filter((obj) => obj.desription == 'medium')
  let largeObjects = points.filter((obj) => obj.desription == 'large')

  watch([regen, radius], () => {
    sampler = new Sampler(pointsMatrix, { width, height }, undefined, Math.random)
    points = sampler.generatePoints()
    smallObjects = points.filter((obj) => obj.desription == 'small')
    mediumObjects = points.filter((obj) => obj.desription == 'medium')
    largeObjects = points.filter((obj) => obj.desription == 'large')
  })
</script>

{#each smallObjects as pos}
  {@const x = pos.x - 10}
  {@const z = pos.y - 10}
  {@const rot = Math.random() * Math.PI * 2}
  {@const scale = Math.random() * 2 + 0.5}
  <Bush
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}
{#each mediumObjects as pos}
  {@const x = pos.x - 10}
  {@const z = pos.y - 10}
  {@const rot = Math.random() * Math.PI * 2}
  {@const scale = Math.random() * 1.5 + 2}
  <Tree
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}
{#each largeObjects as pos}
  {@const x = pos.x - 10}
  {@const z = pos.y - 10}
  {@const rot = Math.random() * Math.PI * 2}
  {@const scale = Math.random() * 2 + 1}
  <Rock
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}
