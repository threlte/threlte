<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import type { Texture } from 'three'
  import { GroundProjectedEnv } from 'three/examples/jsm/objects/GroundProjectedEnv'
  import type { EnvironmentProps } from './Environment.svelte'

  type Props = Required<EnvironmentProps>

  export let groundProjection: Props['groundProjection']
  export let currentEnvMap: Texture

  const { scene, invalidate } = useThrelte()

  let previousEnvMap: Texture | undefined

  let currentGroundEnv: any

  const applyGroundParams = () => {
    if (groundProjection && currentGroundEnv) {
      currentGroundEnv.radius = groundProjection.radius
      currentGroundEnv.height = groundProjection.height

      if (Array.isArray(groundProjection.scale)) {
        const [x, y, z] = [...groundProjection.scale]
        currentGroundEnv.scale.set(x | 1, y | 1, z | 1)
        return
      }

      if (typeof groundProjection.scale === 'number') {
        currentGroundEnv.scale.set(
          groundProjection.scale,
          groundProjection.scale,
          groundProjection.scale
        )
        return
      }

      currentGroundEnv.scale.set(
        groundProjection.scale.x ?? 1,
        groundProjection.scale.y ?? 1,
        groundProjection.scale.z ?? 1
      )
    }
  }

  const removeGroundEnv = () => {
    scene.remove(currentGroundEnv)
    currentGroundEnv = undefined
  }

  const toggleGroundEnv = (
    groundEnv: GroundProjectedEnv | undefined,
    groundEnvProps: Props['groundProjection'],
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
