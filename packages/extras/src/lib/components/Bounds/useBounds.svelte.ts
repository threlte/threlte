import { useTask, useThrelte } from '@threlte/core'
import { getContext, setContext, tick } from 'svelte'
import { fromStore } from 'svelte/store'
import {
  Box3,
  Vector3,
  Group,
  Quaternion,
  Matrix4,
  Vector2,
  Vector4,
  Spherical,
  Sphere,
  Raycaster
} from 'three'
import { useControlsContext } from '../controls/useControlsContext.js'
import type { OrbitControls, TrackballControls } from 'three/examples/jsm/Addons.js'
import CameraControls from 'camera-controls'

export interface BoundsContext {
  reset(): void
  fit(): void
}

const key = Symbol('<Bounds>')

let installed = false

const install = () => {
  if (installed) {
    return
  }

  CameraControls.install({
    THREE: {
      Vector2,
      Vector3,
      Vector4,
      Quaternion,
      Matrix4,
      Spherical,
      Box3,
      Sphere,
      Raycaster
    }
  })

  installed = true
}

export const provideBounds = (
  ref: () => Group,
  margin: () => number,
  animate: () => boolean,
  onFit: () => (() => void) | undefined
) => {
  install()

  const { camera, dom, invalidate } = useThrelte()
  const {
    orbitControls: orbitStore,
    trackballControls: trackballStore,
    cameraControls: ccStore
  } = useControlsContext()

  const orbitControls = fromStore(orbitStore)
  const trackballControls = fromStore(trackballStore)
  const cameraControls = fromStore(ccStore)

  const boundsControls = new CameraControls(camera.current, dom)
  const { smoothTime } = boundsControls
  boundsControls.disconnect()

  $effect.pre(() => {
    boundsControls.camera = camera.current
  })

  $effect.pre(() => {
    boundsControls.smoothTime = animate() ? smoothTime : 0.001
  })

  let animating = $state(false)

  const controls = $derived<OrbitControls | CameraControls | TrackballControls>(
    orbitControls.current ??
      trackballControls.current ??
      cameraControls.current ??
      ({ enabled: false } as OrbitControls)
  )

  const fit = async () => {
    const { azimuthAngle, polarAngle } = boundsControls
    const currentMargin = margin()
    const currentControls = controls

    currentControls.enabled = false

    animating = true

    await Promise.all([
      boundsControls.fitToBox(ref(), true, {
        paddingBottom: currentMargin,
        paddingLeft: currentMargin,
        paddingTop: currentMargin,
        paddingRight: currentMargin
      }),

      // Preserve previous rotation
      boundsControls?.rotateAzimuthTo(azimuthAngle, true),
      boundsControls?.rotatePolarTo(polarAngle, true)
    ])

    if ('fromJSON' in currentControls) {
      currentControls.fromJSON(boundsControls.toJSON())
      currentControls.update?.(0)
    } else {
      boundsControls.getTarget(currentControls.target, true)
      currentControls.update?.()
    }

    animating = false

    await tick()

    currentControls.enabled = true

    onFit()?.()
  }

  const reset = async () => {
    animating = true

    await boundsControls.reset(animate())

    animating = false
  }

  useTask(
    (delta) => {
      if (boundsControls.update(delta)) {
        invalidate()
      }
    },
    {
      running: () => animating,
      autoInvalidate: false
    }
  )

  const context: BoundsContext = {
    fit,
    reset
  }

  setContext(key, context)

  return context
}

export const useBounds = (): BoundsContext => {
  return getContext<BoundsContext>(key)
}
