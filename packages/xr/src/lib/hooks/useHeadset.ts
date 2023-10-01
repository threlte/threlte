import { useFrame, useThrelte } from '@threlte/core'
import { Group } from 'three'
import { isPresenting } from '../internal/stores'

const group = new Group()

let initialized = false

const initialize = () => {
  const { renderer, camera } = useThrelte()
  const { xr } = renderer

  const immersiveFrame = useFrame(() => {
    const space = xr.getReferenceSpace()

    if (space === null) return

    const pose = xr.getFrame().getViewerPose(space)

    if (pose === undefined) return

    const { position, orientation } = pose.transform

    group.position.set(position.x, position.y, position.z)
    group.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w)
  }, { autostart: false })

  const nonImmersiveFrame = useFrame(() => {
    group.position.copy(camera.current.position)
    group.quaternion.copy(camera.current.quaternion)
  }, { autostart: false })

  isPresenting.subscribe((value) => {
    if (value) {
      immersiveFrame.start()
      nonImmersiveFrame.stop()
    } else {
      immersiveFrame.stop()
      nonImmersiveFrame.start()
    }
  })
}

export const useHeadset = (): Readonly<THREE.Group> => {
  // We don't want to perform headset syncing more than once per frame
  if (!initialized) {
    initialize()
    initialized = true
  }

  return group
}
