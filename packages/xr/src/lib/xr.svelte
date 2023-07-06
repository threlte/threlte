<script lang='ts'>

import { onDestroy } from 'svelte';
import { T, useThrelte, createRawEventDispatcher, useFrame } from '@threlte/core'
import type { XRManagerEvent } from './types'
import { session, referenceSpaceType, player, isPresenting, isHandTracking, xrFrame, initialized } from './stores'
import { xrRenderCallbacks } from './hooks/use-xr-frame'

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
  sessionstart: THREE.Event & { target: XRSession }
  /** Called after an XRSession is terminated */
  sessionend: THREE.Event & { target: XRSession }
  /** Called when an XRSession is hidden or unfocused. */
  visibilitychange: THREE.Event & { target: XRSession }
  /** Called when available inputsources change */
  inputsourceschange: THREE.Event & { target: XRSession }
}

const dispatch = createRawEventDispatcher<$$Events>()

const { renderer, camera } = useThrelte()

let cleanup: () => void = () => {}

const { start, stop } = useFrame((_ctx, dt) => {
  const frame = renderer!.xr.getFrame()
  xrFrame.set(frame)
  for (let callback of xrRenderCallbacks) {
    callback(frame, dt)
  }
}, { autostart: false })

const handleSessionStart = (event: XRManagerEvent) => {
  start()
  $isPresenting = true
  dispatch('sessionstart', { ...event, target: $session! })
}

const handleSessionEnd = (event: XRManagerEvent) => {
  stop()
  dispatch('sessionend', { ...event, target: $session! })
  $isPresenting = false
  $session = undefined
}

const handleVisibilityChange = (event: XRSessionEvent) => {
  dispatch('visibilitychange', { ...event, target: $session! })
}

const handleInputSourcesChange = (event: XRInputSourceChangeEvent) => {
  $isHandTracking = Object.values($session!.inputSources).some((source) => source.hand)
  dispatch('inputsourceschange', { ...event, target: $session! })
}

renderer!.xr.enabled = true
renderer!.xr.addEventListener('sessionstart', handleSessionStart)
renderer!.xr.addEventListener('sessionend', handleSessionEnd)

$: renderer!.xr.setFoveation(foveation)

$: if (frameRate !== undefined) {
  try {
    $session?.updateTargetFrameRate(frameRate)
  } catch {}
}

$: {
  renderer!.xr.setReferenceSpaceType(referenceSpace)
  $referenceSpaceType = referenceSpace
}

$: {
  cleanup()

  if ($session === undefined) {
    renderer!.xr.setSession(null)
  } else {
    $session.addEventListener('visibilitychange', handleVisibilityChange)
    $session.addEventListener('inputsourceschange', handleInputSourcesChange)

    renderer!.xr.setSession($session!).then(() => {
      // on setSession, three#WebXRManager resets foveation to 1
      // so foveation set needs to happen after it
      renderer!.xr.setFoveation(foveation)
    })

    cleanup = () => {
      $session?.removeEventListener('visibilitychange', handleVisibilityChange)
      $session?.removeEventListener('inputsourceschange', handleInputSourcesChange)
    }
  }
}

onDestroy(() => {
  renderer!.xr.enabled = false
  renderer!.xr.removeEventListener('sessionstart', handleSessionStart)
  renderer!.xr.removeEventListener('sessionend', handleSessionEnd)
  renderer!.setAnimationLoop(null)
})

$initialized = true

</script>

<!--
@component
`<XR />` is a WebXR manager that configures your scene for XR rendering
and interaction. This lives within a Threlte `<Canvas />`.

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
<T name='Player' is={$player}>
  <T is={camera.current} />
</T>

{#if $isPresenting}
  <slot />
{/if}
