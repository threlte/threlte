<script lang="ts">
  import type { EnvironmentProperties } from '$lib/types/components'
  import { useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import type { Texture } from 'three'
  import { GroundProjectedEnv } from 'three/examples/jsm/objects/GroundProjectedEnv'

  export let groundProjection: EnvironmentProperties['groundProjection']
  export let currentEnvMap: Texture

  const { scene, invalidate } = useThrelte()

  let currentGroundEnv: any

  const toggleGroundEnv = (
    groundEnv: GroundProjectedEnv | undefined,
    groundEnvProps: EnvironmentProperties['groundProjection'],
    envMap: Texture
  ) => {
    if (!groundEnv && groundEnvProps && envMap) {
      currentGroundEnv = new GroundProjectedEnv(envMap)
      if (typeof groundEnvProps.scale === 'number') {
        currentGroundEnv.scale.set(groundEnvProps.scale, groundEnvProps.scale, groundEnvProps.scale)
      } else {
        currentGroundEnv.scale.set(
          groundEnvProps.scale.x ?? 1,
          groundEnvProps.scale.y ?? 1,
          groundEnvProps.scale.z ?? 1
        )
      }
      currentGroundEnv.radius = groundEnvProps.radius
      currentGroundEnv.height = groundEnvProps.height
      scene.add(currentGroundEnv)
      invalidate('Enabling ground projected environment')
    }
    if (groundEnv && groundEnvProps) {
      currentGroundEnv.radius = groundEnvProps.radius
      currentGroundEnv.height = groundEnvProps.height
      invalidate('Updating ground projected environment properties')
    }
  }

  $: toggleGroundEnv(currentGroundEnv, groundProjection, currentEnvMap)

  onDestroy(() => {
    if (currentGroundEnv) {
      scene.remove(currentGroundEnv)
      currentGroundEnv = undefined
    }
    invalidate('Removing ground projected environment')
  })
</script>
