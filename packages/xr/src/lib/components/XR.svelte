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
  import type { EventListener, WebXRManager, Event as ThreeEvent } from 'three'
  import type { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js'
  import type { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'
  import { untrack, type Snippet } from 'svelte'
  import { useThrelte } from '@threlte/core'
  import {
    isHandTracking,
    isPresenting,
    referenceSpaceType,
    session,
    xr
  } from '../internal/state.svelte.js'
  import { setupRaf } from '../internal/setupRaf.svelte.js'
  import { setupHeadset } from '../internal/setupHeadset.svelte.js'
  import { setupControllers } from '../internal/setupControllers.js'
  import { setupHands } from '../internal/setupHands.js'

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

    /** Called as an XRSession is started */
    onsessionstart?: (event: ThreeEvent<'sessionstart', WebXRManager>) => void

    /** Called after an XRSession is ended */
    onsessionend?: (event: XRSessionEvent) => void

    /** Optionally provide custom XRHandModelFactory */
    handFactory?: XRHandModelFactory

    /** Optionally provide custom XRControllerModelFactory */
    controllerFactory?: XRControllerModelFactory

    /** Called when an XRSession is hidden or unfocused. */
    onvisibilitychange?: (event: XRSessionEvent) => void

    /** Called when available inputsources change */
    oninputsourceschange?: (event: XRSessionEvent) => void

    /** Called when the session frame rate changes. */
    onframeratechange?: (event: XRSessionEvent) => void
  }

  let {
    foveation = 1,
    frameRate,
    referenceSpace = 'local-floor',
    onsessionstart,
    onsessionend,
    onvisibilitychange,
    oninputsourceschange,
    onframeratechange,
    fallback,
    children,
    handFactory,
    controllerFactory
  }: Props = $props()

  const { renderer, renderMode } = useThrelte()

  setupRaf()
  setupHeadset()
  setupControllers(controllerFactory)
  setupHands(handFactory)

  const handleSessionStart: EventListener<object, 'sessionstart', WebXRManager> = (event) => {
    isPresenting.current = true
    const currentSession = renderer.xr.getSession()
    if (currentSession !== null) {
      isHandTracking.current = Array.from(currentSession.inputSources).some(
        (source) => source.hand !== undefined
      )
    }
    onsessionstart?.(event)
  }

  const handleSessionEnd = (event: XRSessionEvent) => {
    onsessionend?.(event)
    isPresenting.current = false
    isHandTracking.current = false
    session.current = undefined
  }

  const handleVisibilityChange = (event: XRSessionEvent) => {
    onvisibilitychange?.(event)
  }

  const handleInputSourcesChange = (event: XRInputSourcesChangeEvent) => {
    isHandTracking.current = Array.from(event.session.inputSources).some((source) => source.hand)
    oninputsourceschange?.(event)
  }

  const handleFramerateChange = (event: XRSessionEvent) => {
    onframeratechange?.(event)
  }

  $effect(() => {
    const currentSession = session.current

    if (currentSession === undefined) {
      return
    }

    currentSession.addEventListener('visibilitychange', handleVisibilityChange)
    currentSession.addEventListener('inputsourceschange', handleInputSourcesChange)
    currentSession.addEventListener('frameratechange', handleFramerateChange)
    currentSession.addEventListener('end', handleSessionEnd)

    return () => {
      currentSession.removeEventListener('visibilitychange', handleVisibilityChange)
      currentSession.removeEventListener('inputsourceschange', handleInputSourcesChange)
      currentSession.removeEventListener('frameratechange', handleFramerateChange)
      currentSession.removeEventListener('end', handleSessionEnd)
    }
  })

  $effect.pre(() => {
    if (!isPresenting.current) return

    // Capture the mode from before we forced 'always' so it survives
    // any manual renderMode changes made during the session.
    const saved = untrack(() => renderMode.current)
    renderMode.set('always')

    return () => {
      renderMode.set(saved)
    }
  })

  $effect.pre(() => {
    const currentSession = session.current

    xr.current = renderer.xr
    renderer.xr.enabled = true
    renderer.xr.addEventListener('sessionstart', handleSessionStart)

    return () => {
      xr.current = undefined
      renderer.xr.enabled = false
      renderer.xr.removeEventListener('sessionstart', handleSessionStart)

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
