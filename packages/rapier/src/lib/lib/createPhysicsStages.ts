import { useStage, useThrelte, type CurrentWritable, type Key, type Stage } from '@threlte/core'
import type { Framerate } from '../types/types.js'
import { simulationKey, synchronizationKey } from './keys.js'

export const createPhysicsStages = (
  framerate: CurrentWritable<Framerate>,
  simulationOffset: CurrentWritable<number>,
  updateRigidBodySimulationData: CurrentWritable<boolean>,
  options?: {
    simulationStageOptions?: {
      before?: (Key | Stage) | (Key | Stage)[]
      after?: (Key | Stage) | (Key | Stage)[]
    }
    synchronizationStageOptions?: {
      before?: (Key | Stage) | (Key | Stage)[]
      after?: (Key | Stage) | (Key | Stage)[]
    }
  }
) => {
  let fixedStepTimeAccumulator = 0
  let simulationTime = 0
  let lastSimulationTime = 0

  const { renderStage } = useThrelte()

  const simulationStage = useStage(simulationKey, {
    after: options?.simulationStageOptions?.after,
    before: options?.simulationStageOptions?.before,
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

  const synchronizationStage = useStage(synchronizationKey, {
    after: options?.synchronizationStageOptions?.after
      ? Array.isArray(options.synchronizationStageOptions.after)
        ? [...options.synchronizationStageOptions.after, simulationKey]
        : [options.synchronizationStageOptions.after, simulationKey]
      : simulationKey,
    before: options?.synchronizationStageOptions?.before
      ? Array.isArray(options.synchronizationStageOptions.before)
        ? [...options.synchronizationStageOptions.before, renderStage]
        : [options.synchronizationStageOptions.before, renderStage]
      : renderStage
  })

  return { simulationStage, synchronizationStage }
}
