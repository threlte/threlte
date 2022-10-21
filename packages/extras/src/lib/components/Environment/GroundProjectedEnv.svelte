<script lang="ts">
  import type { EnvironmentProperties } from '$lib/types/components'
  import { useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import type { Texture } from 'three'
  import { GroundProjectedEnv } from 'three/examples/jsm/objects/GroundProjectedEnv'

  export let groundProjection: EnvironmentProperties['groundProjection']
  export let currentEnvMap: Texture

  const { scene, invalidate } = useThrelte()

  let previousEnvMap: Texture | undefined

  let currentGroundEnv: any

  const applyGroundParams = () => {
    if (groundProjection && currentGroundEnv) {
      if (typeof groundProjection.scale === 'number') {
        currentGroundEnv.scale.set(
          groundProjection.scale,
          groundProjection.scale,
          groundProjection.scale
        )
      } else {
        currentGroundEnv.scale.set(
          groundProjection.scale.x ?? 1,
          groundProjection.scale.y ?? 1,
          groundProjection.scale.z ?? 1
        )
      }
      currentGroundEnv.radius = groundProjection.radius
      currentGroundEnv.height = groundProjection.height
    }
  }

  const removeGroundEnv = () => {
    scene.remove(currentGroundEnv)
    currentGroundEnv = undefined
  }

  const toggleGroundEnv = (
    groundEnv: GroundProjectedEnv | undefined,
    groundEnvProps: EnvironmentProperties['groundProjection'],
    envMap: Texture
  ) => {
    if (groundEnv && previousEnvMap != envMap) removeGroundEnv()
    if ((!groundEnv || previousEnvMap != envMap) && groundEnvProps && envMap) {
      currentGroundEnv = new GroundProjectedEnv(envMap)

      scene.add(currentGroundEnv)
      previousEnvMap = envMap
      applyGroundParams()
      invalidate('Enabling ground projected environment')
    }
    if (groundEnv && groundEnvProps) {
      applyGroundParams()
      invalidate('Updating ground projected environment properties')
    }
  }

  $: toggleGroundEnv(currentGroundEnv, groundProjection, currentEnvMap)

  onDestroy(() => {
    if (currentGroundEnv) removeGroundEnv()
    invalidate('Removing ground projected environment')
  })
</script>
