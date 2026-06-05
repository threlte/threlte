import { Group, Matrix4, Vector3 } from 'three'
import { useThrelte, useTask, useStage } from '@threlte/core'
import { isPresenting } from './state.svelte.js'
import { useXROrigin } from '../hooks/useXROrigin.svelte.js'

export const headset = new Group()

const poseMatrix = new Matrix4()
const tempScale = new Vector3()

export const setupHeadset = () => {
  const { renderer, camera, renderStage } = useThrelte()
  const stage = useStage(Symbol('xr-headset-stage'), { before: renderStage })
  const xrOrigin = useXROrigin()

  const { xr } = renderer

  useTask(
    () => {
      const space = xr.getReferenceSpace()

      if (space === null) return

      const pose = xr.getFrame().getViewerPose(space)

      // Although pose is only typed as possibly undefined,
      // It can be null on android chrome when using phone AR.
      if (pose === undefined || pose === null) return

      const origin = xrOrigin.current

      if (origin === undefined) {
        const { position, orientation } = pose.transform
        headset.position.copy(position)
        headset.quaternion.copy(orientation)
      } else {
        origin.updateWorldMatrix(true, false)
        poseMatrix.fromArray(pose.transform.matrix).premultiply(origin.matrixWorld)
        poseMatrix.decompose(headset.position, headset.quaternion, tempScale)
      }
    },
    {
      autoInvalidate: false,
      stage,
      running: () => isPresenting.current
    }
  )

  useTask(
    () => {
      camera.current.getWorldPosition(headset.position)
      camera.current.getWorldQuaternion(headset.quaternion)
    },
    {
      autoInvalidate: false,
      stage,
      running: () => isPresenting.current === false
    }
  )
}
