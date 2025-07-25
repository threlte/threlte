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
  import type { Snippet } from 'svelte'
  import { useThrelte } from '@threlte/core'
  import type { XRSessionEvent } from '../types'
  import {
    isHandTracking,
    isPresenting,
    referenceSpaceType,
    session,
    xr
  } from '../internal/state.svelte'
  import { setupRaf } from '../internal/setupRaf.svelte'
  import { setupHeadset } from '../internal/setupHeadset.svelte'
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

  let originalRenderMode = $renderMode

  setupRaf()
  setupHeadset()
  setupControllers()
  setupHands()

  const handleSessionStart = () => {
    isPresenting.current = true
    onsessionstart?.({ type: 'sessionstart', target: session.current } as any)
  }

  const handleSessionEnd = () => {
    onsessionend?.({ type: 'sessionend', target: session.current } as any)
    isPresenting.current = false
    session.current = undefined
  }

  const handleVisibilityChange = (event: globalThis.XRSessionEvent) => {
    onvisibilitychange?.({ ...event, target: session.current! })
  }

  const handleInputSourcesChange = (event: XRInputSourcesChangeEvent) => {
    isHandTracking.current = Object.values(event.session.inputSources).some((source) => source.hand)
    oninputsourceschange?.({ ...event, target: session.current! })
  }

  const handleFramerateChange = (event: globalThis.XRSessionEvent) => {
    onvisibilitychange?.({ ...event, target: session.current! })
  }

  $effect(() => {
    const currentSession = session.current

    if (currentSession === undefined) {
      return
    }

    currentSession.addEventListener('visibilitychange', handleVisibilityChange)
    currentSession.addEventListener('inputsourceschange', handleInputSourcesChange)
    currentSession.addEventListener('frameratechange', handleFramerateChange)

    return () => {
      currentSession.removeEventListener('visibilitychange', handleVisibilityChange)
      currentSession.removeEventListener('inputsourceschange', handleInputSourcesChange)
      currentSession.removeEventListener('frameratechange', handleFramerateChange)
    }
  })

  $effect.pre(() => {
    if (isPresenting.current) {
      originalRenderMode = renderMode.current
      renderMode.set('always')
    } else {
      renderMode.set(originalRenderMode)
    }
  })

  $effect.pre(() => {
    const currentSession = session.current

    xr.current = renderer.xr
    renderer.xr.enabled = true
    renderer.xr.addEventListener('sessionstart', handleSessionStart)
    renderer.xr.addEventListener('sessionend', handleSessionEnd)

    return () => {
      xr.current = undefined
      renderer.xr.enabled = false
      renderer.xr.removeEventListener('sessionstart', handleSessionStart)
      renderer.xr.removeEventListener('sessionend', handleSessionEnd)

      // if unmounted while presenting (e.g. due to sveltekit navigation), end the session
      currentSession?.end()
    }
  })

  $effect.pre(() => {
    if (frameRate === undefined) return

    try {
      session.current?.updateTargetFrameRate(frameRate)
    } catch {
      // Do nothing
    }
  })

  $effect.pre(() => {
    renderer.xr.setFoveation(foveation)
  })

  $effect.pre(() => {
    renderer.xr.setReferenceSpaceType(referenceSpace)
    referenceSpaceType.current = referenceSpace
  })
</script>

{#if isPresenting.current}
  {@render children?.()}
{:else}
  {@render fallback?.()}
{/if}
