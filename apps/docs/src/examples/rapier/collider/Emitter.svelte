<script lang="ts">
  import { useTask } from '@threlte/core'
  import { MathUtils, Quaternion, Vector3 } from 'three'
  import Particle from './Particle.svelte'

  type Body = {
    id: string
    mounted: number
    position: Vector3
    quaternion: Quaternion
  }

  let bodies = $state<Body[]>([])

  let lastBodyMounted = 0
  let bodyEveryMilliseconds = 100
  let longevityMilliseconds = 8000

  useTask(() => {
    if (lastBodyMounted + bodyEveryMilliseconds < Date.now()) {
      const body: Body = {
        id: MathUtils.generateUUID(),
        mounted: Date.now(),
        position: new Vector3(0, 15, 0),
        quaternion: new Quaternion().random()
      }
      bodies.unshift(body)
      lastBodyMounted = Date.now()
    }

    const deleteIds: string[] = []
    bodies.forEach((body) => {
      if (body.mounted + longevityMilliseconds < Date.now()) {
        deleteIds.push(body.id)
      }
    })

    if (deleteIds.length) {
      deleteIds.forEach((id) => {
        const index = bodies.findIndex((body) => body.id === id)
        if (index !== -1) bodies.splice(index, 1)
      })
    }
  })
</script>

{#each bodies as body (body.id)}
  <Particle {...body} />
{/each}
