import { useStage, useThrelte, type CurrentWritable, type Key, type Stage } from '@threlte/core'
import type { Framerate, RapierContext } from '../types/types'

const physicsSimulationKey = Symbol('physics-simulation')
const physicsRenderKey = Symbol('physics-render')

export const createPhysicsStages = (
  framerate: CurrentWritable<Framerate>,
  simulationOffset: CurrentWritable<number>,
  updateRigidBodySimulationData: CurrentWritable<boolean>,
  options?: {
    physicsStageOptions?: {
      before?: (Key | Stage) | (Key | Stage)[]
      after?: (Key | Stage) | (Key | Stage)[]
    }
    physicsRenderStageOptions?: {
      before?: (Key | Stage) | (Key | Stage)[]
      after?: (Key | Stage) | (Key | Stage)[]
    }
  }
) => {
  let fixedStepTimeAccumulator = 0
  let simulationTime = 0
  let lastSimulationTime = 0

  const { renderStage } = useThrelte()

  const physicsStage = useStage(physicsSimulationKey, {
    after: options?.physicsStageOptions?.after,
    before: options?.physicsStageOptions?.before,
    callback(delta, runTasks) {
      if (framerate.current === 'varying') {
        runTasks()
      } else {
        const rate = 1 / framerate.current
        simulationTime += delta
        fixedStepTimeAccumulator += delta
        const iterations = Math.ceil(fixedStepTimeAccumulator / rate)
        for (let iteration = 0; iteration < iterations; iteration++) {
          updateRigidBodySimulationData.set(iteration >= iterations - 2)
          runTasks(rate)
          fixedStepTimeAccumulator -= rate
          lastSimulationTime += rate
        }
        simulationOffset.set((simulationTime - lastSimulationTime) / rate + 1)
      }
    }
  })

  const physicsRenderStage = useStage(physicsRenderKey, {
    after: options?.physicsRenderStageOptions?.after
      ? Array.isArray(options.physicsRenderStageOptions.after)
        ? [...options.physicsRenderStageOptions.after, physicsSimulationKey]
        : [options.physicsRenderStageOptions.after, physicsSimulationKey]
      : physicsSimulationKey,
    before: options?.physicsRenderStageOptions?.before
      ? Array.isArray(options.physicsRenderStageOptions.before)
        ? [...options.physicsRenderStageOptions.before, renderStage]
        : [options.physicsRenderStageOptions.before, renderStage]
      : renderStage
  })

  return { physicsStage, physicsRenderStage }
}
