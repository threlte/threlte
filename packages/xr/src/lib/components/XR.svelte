<!--

@component `<XR />` is a WebXR manager that configures your scene for XR rendering and interaction.

This should be placed within a Threlte `<Canvas />`.

```svelte
  <XR
    foveation={1}
    frameRate={90}
    referenceSpace='local-floor'
    on:sessionstart={(event: XREvent<XRManagerEvent>) => {}}
    on:sessionend={(event: XREvent<XRManagerEvent>) => {}}
    on:visibilitychange={(event: XREvent<XRSessionEvent>) => {}}
    on:inputsourceschange={(event: XREvent<XRSessionEvent>) => {}}
  />
```

-->
<script lang="ts">
  import { onMount } from 'svelte'
  import { createRawEventDispatcher, useThrelte, watch } from '@threlte/core'
  import type { XRSessionEvent } from '../types'
  import {
    isHandTracking,
    isPresenting,
    referenceSpaceType,
    session,
    xr as xrStore
  } from '../internal/stores'
  import { setupRaf } from '../internal/setupRaf'
  import { setupHeadset } from '../internal/setupHeadset'
  import { setupControllers } from '../internal/setupControllers'
  import { setupHands } from '../internal/setupHands'

  /**
   * Enables foveated rendering. Default is `1`, the three.js default.
   *
   * 0 = no foveation, full resolution
   *
   * 1 = maximum foveation, the edges render at lower resolution
   */
  export let foveation: number = 1

  /**
   * The target framerate for the XRSystem. Smaller rates give more CPU headroom at the cost of responsiveness.
   * Recommended range is `72`-`120`. Default is unset and left to the device.
   * @note If your experience cannot effectively reach the target framerate, it will be subject to frame reprojection
   * which will halve the effective framerate. Choose a conservative estimate that balances responsiveness and
   * headroom based on your experience.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Rendering#refresh_rate_and_frame_rate
   */
  export let frameRate: number | undefined = undefined

  /** Type of WebXR reference space to use. Default is `local-floor` */
  export let referenceSpace: XRReferenceSpaceType = 'local-floor'

  type $$Events = {
    /** Called as an XRSession is requested */
    sessionstart: XRSessionEvent<'sessionstart'>
    /** Called after an XRSession is terminated */
    sessionend: XRSessionEvent<'sessionend'>
    /** Called when an XRSession is hidden or unfocused. */
    visibilitychange: globalThis.XRSessionEvent
    /** Called when available inputsources change */
    inputsourceschange: globalThis.XRSessionEvent
  }

  const dispatch = createRawEventDispatcher<$$Events>()
  const { renderer, renderMode } = useThrelte()
  const { xr } = renderer

  let originalRenderMode = $renderMode

  setupRaf()
  setupHeadset()
  setupControllers()
  setupHands()

  const handleSessionStart = () => {
    isPresenting.set(true)
    dispatch('sessionstart', { type: 'sessionstart', target: $session! })
  }

  const handleSessionEnd = () => {
    dispatch('sessionend', { type: 'sessionend', target: $session! })
    isPresenting.set(false)
    session.set(undefined)
  }

  const handleVisibilityChange = (event: globalThis.XRSessionEvent) => {
    dispatch('visibilitychange', { ...event, target: $session! })
  }

  const handleInputSourcesChange = (event: XRInputSourceChangeEvent) => {
    $isHandTracking = Object.values(event.session.inputSources).some((source) => source.hand)
    dispatch('inputsourceschange', { ...event, target: $session! })
  }

  const handleFramerateChange = (event: globalThis.XRSessionEvent) => {
    dispatch('visibilitychange', { ...event, target: $session! })
  }

  const updateTargetFrameRate = (frameRate?: number) => {
    if (frameRate === undefined) return

    try {
      $session?.updateTargetFrameRate(frameRate)
    } catch {
      // Do nothing
    }
  }

  watch(session, (currentSession) => {
    if (currentSession === undefined) return

    currentSession.addEventListener('visibilitychange', handleVisibilityChange)
    currentSession.addEventListener('inputsourceschange', handleInputSourcesChange)
    currentSession.addEventListener('frameratechange', handleFramerateChange)

    xr.setFoveation(foveation)

    updateTargetFrameRate(frameRate)

    return () => {
      currentSession.removeEventListener('visibilitychange', handleVisibilityChange)
      currentSession.removeEventListener('inputsourceschange', handleInputSourcesChange)
      currentSession.removeEventListener('frameratechange', handleFramerateChange)
    }
  })

  watch(isPresenting, (presenting) => {
    if (presenting) {
      originalRenderMode = renderMode.current
      renderMode.set('always')
    } else {
      renderMode.set(originalRenderMode)
    }
  })

  onMount(() => {
    $xrStore = xr
    xr.enabled = true
    xr.addEventListener('sessionstart', handleSessionStart)
    xr.addEventListener('sessionend', handleSessionEnd)

    return () => {
      $xrStore = undefined
      xr.enabled = false
      xr.removeEventListener('sessionstart', handleSessionStart)
      xr.removeEventListener('sessionend', handleSessionEnd)
    }
  })

  $: updateTargetFrameRate(frameRate)
  $: xr.setFoveation(foveation)
  $: {
    xr.setReferenceSpaceType(referenceSpace)
    $referenceSpaceType = referenceSpace
  }
</script>

{#if $isPresenting}
  <slot />
{:else}
  <slot name="fallback" />
{/if}
