<!--
@component
`<XR />` is a WebXR manager that configures your scene for XR rendering
and interaction. This should be placed within a Threlte `<Canvas />`.

```svelte
  <XR
    foveation={0}
    frameRate={90}
    referenceSpace='local-floor'
    on:sessionstart={(event: XREvent<XRManagerEvent>) => {}}
    on:sessionend={(event: XREvent<XRManagerEvent>) => {}}
    on:visibilitychange={(event: XREvent<XRSessionEvent>) => {}}
    on:inputsourceschange={(event: XREvent<XRSessionEvent>) => {}}
  />
```
-->

<script lang='ts'>

import { onDestroy } from 'svelte';
import { T, useThrelte, createRawEventDispatcher, useFrame } from '@threlte/core'
import type { XRSessionEvent } from './types'
import { session, referenceSpaceType, player, isPresenting, isHandTracking, xrFrame, initialized } from './stores'

/**
 * Enables foveated rendering. `Default is `0`
 * 0 = no foveation, full resolution
 * 1 = maximum foveation, the edges render at lower resolution
 */
export let foveation: number = 0

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

const { renderer, camera } = useThrelte()
const { xr } = renderer!

const { start, stop } = useFrame(() => {
  xrFrame.set(xr.getFrame())
}, { autostart: false })

const handleSessionStart = (event: XRSessionEvent<'sessionstart'>) => {
  start()
  $isPresenting = true
  dispatch('sessionstart', { ...event, target: $session! })
}

const handleSessionEnd = (event: XRSessionEvent<'sessionend'>) => {
  stop()
  dispatch('sessionend', { ...event, target: $session! })
  $isPresenting = false
  $session = undefined
}

const handleVisibilityChange = (event: globalThis.XRSessionEvent) => {
  dispatch('visibilitychange', { ...event, target: $session! })
}

const handleInputSourcesChange = (event: XRInputSourceChangeEvent) => {
  $isHandTracking = Object.values($session!.inputSources).some((source) => source.hand)
  dispatch('inputsourceschange', { ...event, target: $session! })
}

const handleFramerateChange = (event: globalThis.XRSessionEvent) => {
  dispatch('visibilitychange', { ...event, target: $session! })
}

const cleanupSession = (session?: XRSession) => {
  if (session === undefined) return

  session.removeEventListener('visibilitychange', handleVisibilityChange)
  session.removeEventListener('inputsourceschange', handleInputSourcesChange)
  session.removeEventListener('frameratechange', handleFramerateChange)
}

const updateTargetFrameRate = (frameRate?: number) => {
  if (frameRate === undefined) return

  try {
    $session?.updateTargetFrameRate(frameRate)
  } catch {}
}

const updateSession = async (session?: XRSession) => {
  if (session === undefined) return

  session.addEventListener('visibilitychange', handleVisibilityChange)
  session.addEventListener('inputsourceschange', handleInputSourcesChange)
  session.addEventListener('frameratechange', handleFramerateChange)

  await xr.setSession(session)

  xr.setFoveation(foveation)
  
  updateTargetFrameRate(frameRate)
}

xr.enabled = true
xr.addEventListener('sessionstart', handleSessionStart)
xr.addEventListener('sessionend', handleSessionEnd)

$: {
  xr.setReferenceSpaceType(referenceSpace)
  $referenceSpaceType = referenceSpace
}

$: cleanupSession($session)
$: updateSession($session)
$: updateTargetFrameRate(frameRate)
$: xr.setFoveation(foveation)

onDestroy(() => {
  xr.enabled = false
  xr.removeEventListener('sessionstart', handleSessionStart)
  xr.removeEventListener('sessionend', handleSessionEnd)
})

$initialized = true

</script>

<T name='Player' is={$player}>
  <T is={camera.current} />
</T>

{#if $isPresenting}
  <slot />
{/if}
