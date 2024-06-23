<!--

@component `<XR />` is a WebXR manager that configures your scene for XR rendering and interaction.

This should be placed within a Threlte `<Canvas />`.

```svelte
  <XR
    foveation={1}
    frameRate={90}
    referenceSpace='local-floor'
    onsessionstart={(event: XREvent<XRManagerEvent>) => {}}
    onsessionend={(event: XREvent<XRManagerEvent>) => {}}
    onvisibilitychange={(event: XREvent<XRSessionEvent>) => {}}
    oninputsourceschange={(event: XREvent<XRSessionEvent>) => {}}
  />
```

-->
<script lang="ts">
  import { onMount, type Snippet } from 'svelte'
  import { useThrelte, watch } from '@threlte/core'
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

  interface Props {
    /**
     * Enables foveated rendering. Default is `1`, the three.js default.
     *
     * 0 = no foveation, full resolution
     *
     * 1 = maximum foveation, the edges render at lower resolution
     */
    foveation?: number

    /**
     * The target framerate for the XRSystem. Smaller rates give more CPU headroom at the cost of responsiveness.
     * Recommended range is `72`-`120`. Default is unset and left to the device.
     * @note If your experience cannot effectively reach the target framerate, it will be subject to frame reprojection
     * which will halve the effective framerate. Choose a conservative estimate that balances responsiveness and
     * headroom based on your experience.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Rendering#refresh_rate_and_frame_rate
     */
    frameRate?: number | undefined

    /** Type of WebXR reference space to use. Default is `local-floor` */
    referenceSpace?: XRReferenceSpaceType

    fallback?: Snippet
    children?: Snippet

    /** Called as an XRSession is requested */
    onsessionstart?: (event: XRSessionEvent<'sessionstart'>) => void

    /** Called after an XRSession is terminated */
    onsessionend?: (event: XRSessionEvent<'sessionend'>) => void

    /** Called when an XRSession is hidden or unfocused. */
    onvisibilitychange?: (event: globalThis.XRSessionEvent) => void

    /** Called when available inputsources change */
    oninputsourceschange?: (event: globalThis.XRSessionEvent) => void
  }

  let {
    foveation = 1,
    frameRate,
    referenceSpace = 'local-floor',
    onsessionstart,
    onsessionend,
    onvisibilitychange,
    oninputsourceschange,
    fallback,
    children
  }: Props = $props()

  const { renderer, renderMode } = useThrelte()
  const { xr } = renderer

  let originalRenderMode = $renderMode

  setupRaf()
  setupHeadset()
  setupControllers()
  setupHands()

  const handleSessionStart = () => {
    isPresenting.set(true)
    onsessionstart?.({ type: 'sessionstart', target: $session! })
  }

  const handleSessionEnd = () => {
    onsessionend?.({ type: 'sessionend', target: $session! })
    isPresenting.set(false)
    session.set(undefined)
  }

  const handleVisibilityChange = (event: globalThis.XRSessionEvent) => {
    onvisibilitychange?.({ ...event, target: $session! })
  }

  const handleInputSourcesChange = (event: XRInputSourceChangeEvent) => {
    $isHandTracking = Object.values(event.session.inputSources).some((source) => source.hand)
    oninputsourceschange?.({ ...event, target: $session! })
  }

  const handleFramerateChange = (event: globalThis.XRSessionEvent) => {
    onvisibilitychange?.({ ...event, target: $session! })
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

  $effect.pre(() => updateTargetFrameRate(frameRate))
  $effect.pre(() => xr.setFoveation(foveation))
  $effect.pre(() => {
    xr.setReferenceSpaceType(referenceSpace)
    $referenceSpaceType = referenceSpace
  })
</script>

{#if $isPresenting}
  {@render children?.()}
{:else}
  {@render fallback?.()}
{/if}
