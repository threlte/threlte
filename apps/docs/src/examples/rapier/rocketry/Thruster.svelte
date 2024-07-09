<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { onMount } from 'svelte'
  import * as THREE from 'three'
  import { SpriteRenderer, System } from 'three-nebula'
  import thruster from './Thruster.json'

  let system: System

  const group = new THREE.Group()

  const nebulaRenderer = new SpriteRenderer(group as any as THREE.Scene, THREE)

  onMount(async () => {
    system = await System.fromJSONAsync(thruster.particleSystemState, THREE)
    system.addRenderer(nebulaRenderer)
  })

  useTask((delta) => {
    if (!system) return
    system.update(delta)
  })
</script>

<T is={group} />
