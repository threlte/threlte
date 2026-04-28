import { Group } from 'three'
import { useThrelte, useTask, useStage } from '@threlte/core'
import { isPresenting } from './state.svelte.js'

export const headset = new Group()

export const setupHeadset = () => {
  const { renderer, camera, renderStage } = useThrelte()
  const stage = useStage(Symbol('xr-headset-stage'), { before: renderStage })

  const { xr } = renderer

  useTask(
    () => {
      const space = xr.getReferenceSpace()

      if (space === null) return

      const pose = xr.getFrame().getViewerPose(space)

      // Although pose is only typed as possibly undefined,
      // It can be null on android chrome when using phone AR.
      if (pose === undefined || pose === null) return

      const { position, orientation } = pose.transform

      headset.position.copy(position)
      headset.quaternion.copy(orientation)
    },
    {
      autoInvalidate: false,
      stage,
      running: () => isPresenting.current
    }
  )

  useTask(
    () => {
      headset.position.copy(camera.current.position)
      headset.quaternion.copy(camera.current.quaternion)
    },
    {
      autoInvalidate: false,
      stage,
      running: () => isPresenting.current === false
    }
  )
}
