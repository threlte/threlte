import { Group } from 'three'
import { useThrelte, useTask, watch } from '@threlte/core'
import { useXR } from '../hooks/useXR'

export const headset = new Group()

export const setupHeadset = () => {
  const { renderer, camera } = useThrelte()
  const { xr } = renderer

  const immersiveFrame = useTask(
    () => {
      const space = xr.getReferenceSpace()

      if (space === null) return

      const pose = xr.getFrame().getViewerPose(space)

      // Although pose is only typed as possibly undefined,
      // It can be null on android chrome when using phone AR.
      if (pose === undefined || pose === null) return

      const { position, orientation } = pose.transform

      headset.position.set(position.x, position.y, position.z)
      headset.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w)
    },
    { autoStart: false, autoInvalidate: false }
  )

  const nonImmersiveFrame = useTask(
    () => {
      headset.position.copy(camera.current.position)
      headset.quaternion.copy(camera.current.quaternion)
    },
    { autoStart: false, autoInvalidate: false }
  )

  watch(useXR().isPresenting, (isPresenting) => {
    if (isPresenting) {
      immersiveFrame.start()
      nonImmersiveFrame.stop()
    } else {
      immersiveFrame.stop()
      nonImmersiveFrame.start()
    }
  })
}
