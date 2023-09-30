<script lang='ts'>
  import { T, useThrelte, createRawEventDispatcher } from '@threlte/core'
  import { onMount } from 'svelte'
  import { XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight'

  export let environmentEstimation = true

  type $$Events = {
    estimationstart: XREstimatedLight
    estimationend: XREstimatedLight
  }

  const dispatch = createRawEventDispatcher<$$Events>()

  let isActive = false
  let originalEnvironment: THREE.Texture | null

  const { scene, renderer } = useThrelte()
  const light = new XREstimatedLight(renderer, environmentEstimation)

  const handleEstimationStart = () => {
    isActive = true
  
    // The estimated lighting provides an environment cubemap, which we can apply here.
    if (light.environment) {
      originalEnvironment = scene.environment
      scene.environment = light.environment
    }

    dispatch('estimationstart', light)
  }

  const handleEstimationEnd = () => {
    isActive = false

    scene.environment = originalEnvironment
    dispatch('estimationend', light)
  } 

  onMount(() => {
    light.addEventListener('estimationstart', handleEstimationStart)
    light.addEventListener('estimationend', handleEstimationEnd)

    return () => {
      light.removeEventListener('estimationstart', handleEstimationStart)
      light.removeEventListener('estimationend', handleEstimationEnd)
      // @ts-expect-error Not typed correctly yet.
      light.dispose()
    }
  })
</script>

{#if isActive}
  <T is={light} />
{:else}
  <slot />
{/if}
