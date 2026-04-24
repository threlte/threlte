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
<script
  module
  lang="ts"
>
  declare global {
    interface XRSystem {
      offerSession?: XRSystem['requestSession']
    }
  }
</script>

<script lang="ts">
  import type { EventListener, WebXRManager, Event as ThreeEvent } from 'three'
  import type { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js'
  import type { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'
  import { untrack, type Snippet } from 'svelte'
  import { useThrelte } from '@threlte/core'
  import {
    isPresenting,
    lastSessionRequest,
    pointerIntersection,
    referenceSpaceType,
    session,
    teleportIntersection,
    xr
  } from '../internal/state.svelte.js'
  import { setupRaf } from '../internal/setupRaf.svelte.js'
  import { setupHeadset } from '../internal/setupHeadset.svelte.js'
  import { setupInputSources } from '../internal/setupInputSources.js'
  import { dispatchXRInputSourceEvent } from '../internal/inputSources.svelte.js'
  import { defaultFeatures } from '../internal/defaultFeatures.js'
  import { toggleXRSession } from '../lib/toggleXRSession.js'

  const INPUT_SOURCE_EVENTS = [
    'select',
    'selectstart',
    'selectend',
    'squeeze',
    'squeezestart',
    'squeezeend'
  ] as const

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

    /**
     * Auto-enter a session when the OS grants one without an explicit request
     * (e.g. when the user puts on a headset). Pass `false` to disable, or an
     * array of modes to restrict which modes are eligible.
     * @default true
     */
    enterGrantedSession?: boolean | XRSessionMode[]

    /**
     * Pre-offer a session via `navigator.xr.offerSession` so the browser can
     * show its own entry UI (e.g. Vision Pro). When `true`, offers AR if
     * supported, otherwise VR. Pass a specific mode to restrict. Pass `false`
     * to disable.
     * @default true
     */
    offerSession?: boolean | XRSessionMode
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
    enterGrantedSession = true,
    offerSession = true,
    fallback,
    children,
    handFactory,
    controllerFactory
  }: Props = $props()

  const { renderer, renderMode } = useThrelte()

  setupRaf()
  setupHeadset()
  const bindInputSources = setupInputSources(controllerFactory, handFactory)

  const handleSessionStart: EventListener<object, 'sessionstart', WebXRManager> = (event) => {
    isPresenting.current = true
    onsessionstart?.(event)
  }

  const handleSessionEnd = (event: XRSessionEvent) => {
    onsessionend?.(event)
    isPresenting.current = false
    session.current = undefined
    pointerIntersection.left = undefined
    pointerIntersection.right = undefined
    teleportIntersection.left = undefined
    teleportIntersection.right = undefined
  }

  const handleVisibilityChange = (event: XRSessionEvent) => {
    onvisibilitychange?.(event)
  }

  const handleInputSourcesChange = (event: XRInputSourcesChangeEvent) => {
    oninputsourceschange?.(event)
  }

  const handleFramerateChange = (event: XRSessionEvent) => {
    onframeratechange?.(event)
  }

  const handleXRInputEvent = (event: XRInputSourceEvent) => {
    dispatchXRInputSourceEvent(event)
  }

  $effect(() => {
    const currentSession = session.current

    if (currentSession === undefined) {
      bindInputSources(undefined)
      return
    }

    bindInputSources(currentSession)

    currentSession.addEventListener('visibilitychange', handleVisibilityChange)
    currentSession.addEventListener('inputsourceschange', handleInputSourcesChange)
    currentSession.addEventListener('frameratechange', handleFramerateChange)
    currentSession.addEventListener('end', handleSessionEnd)
    for (const type of INPUT_SOURCE_EVENTS) {
      currentSession.addEventListener(type, handleXRInputEvent)
    }

    return () => {
      currentSession.removeEventListener('visibilitychange', handleVisibilityChange)
      currentSession.removeEventListener('inputsourceschange', handleInputSourcesChange)
      currentSession.removeEventListener('frameratechange', handleFramerateChange)
      currentSession.removeEventListener('end', handleSessionEnd)
      for (const type of INPUT_SOURCE_EVENTS) {
        currentSession.removeEventListener(type, handleXRInputEvent)
      }
      bindInputSources(undefined)
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
    xr.current = renderer.xr
    renderer.xr.enabled = true
    renderer.xr.addEventListener('sessionstart', handleSessionStart)

    return () => {
      xr.current = undefined
      renderer.xr.enabled = false
      renderer.xr.removeEventListener('sessionstart', handleSessionStart)

      // if unmounted while presenting (e.g. due to sveltekit navigation), end the session
      untrack(() => session.current)
        ?.end()
        .catch(() => {})
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

  $effect.pre(() => {
    if (enterGrantedSession === false) return

    const allowed: XRSessionMode[] = Array.isArray(enterGrantedSession)
      ? enterGrantedSession
      : ['immersive-ar', 'immersive-vr']

    const listener = async () => {
      // Prefer to replay whatever mode + sessionInit the app entered with last.
      if (lastSessionRequest.mode !== undefined && allowed.includes(lastSessionRequest.mode)) {
        toggleXRSession(lastSessionRequest.mode, lastSessionRequest.sessionInit, 'enter').catch(
          () => {}
        )
        return
      }

      for (const mode of allowed) {
        if (await navigator.xr?.isSessionSupported(mode).catch(() => false)) {
          toggleXRSession(mode, { ...defaultFeatures }, 'enter').catch(() => {})
          return
        }
      }
    }

    navigator.xr?.addEventListener('sessiongranted', listener)
    return () => {
      navigator.xr?.removeEventListener('sessiongranted', listener)
    }
  })

  $effect.pre(() => {
    if (navigator.xr === undefined) return
    if (offerSession === false) return
    if (!('offerSession' in navigator.xr)) return
    if (session.current !== undefined) return
    const manager = xr.current
    if (manager === undefined) return

    let cancelled = false

    const run = async () => {
      let mode: XRSessionMode
      if (offerSession === true) {
        const arSupported = await navigator.xr
          ?.isSessionSupported('immersive-ar')
          .catch(() => false)
        mode = arSupported ? 'immersive-ar' : 'immersive-vr'
      } else {
        mode = offerSession
      }

      const init = lastSessionRequest.sessionInit ?? { ...defaultFeatures }

      try {
        const nextSession = await navigator.xr?.offerSession?.(mode, init)
        if (!nextSession || cancelled) return
        await manager.setSession(nextSession)
        if (cancelled) return
        lastSessionRequest.mode = mode
        lastSessionRequest.sessionInit = init
        session.current = nextSession
      } catch {
        // user declined or offer was rejected
      }
    }

    run()

    return () => {
      cancelled = true
    }
  })
</script>

{#if isPresenting.current}
  {@render children?.()}
{:else}
  {@render fallback?.()}
{/if}
