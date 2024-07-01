import {
  useStage,
  useTask,
  useThrelte,
  type Key,
  type Stage,
  type ThrelteUseTaskOptions
} from '@threlte/core'
import { useRapier } from '../hooks/useRapier'
import type { RapierContext } from '../types/types'
import { derived, writable } from 'svelte/store'

const physicsSimulationKey = Symbol('physics-simulation')
const physicsRenderKey = Symbol('physics-render')

export const createPhysicsStages = (
  rapierContext: RapierContext,
  options?: {
    autoStart?: boolean
    simulation?: {
      after?: Key | Stage | (Key | Stage)[]
      before?: Key | Stage | (Key | Stage)[]
    }
    render?: {
      after?: Key | Stage | (Key | Stage)[]
      before?: Key | Stage | (Key | Stage)[]
    }
  }
) => {
  let fixedStepTimeAccumulator = 0
  let simulationTime = 0
  let lastSimulationTime = 0

  const { renderStage } = useThrelte()

  const { start: startSimulation, stop: stopSimulation } = useStage(physicsSimulationKey, {
    after: options?.simulation?.after,
    before: options?.simulation?.before,
    callback(delta, runTasks) {
      if (rapierContext.framerate.current === 'varying') {
        runTasks()
      } else {
        const rate = 1 / rapierContext.framerate.current
        simulationTime += delta
        fixedStepTimeAccumulator += delta
        while (fixedStepTimeAccumulator >= 0) {
          runTasks(rate)
          fixedStepTimeAccumulator -= rate
          lastSimulationTime += rate
        }
        rapierContext.simulationOffset = (simulationTime - lastSimulationTime) / rate + 1
      }
    }
  })

  const { start: startRender, stop: stopRender } = useStage(physicsRenderKey, {
    after: options?.render?.after
      ? Array.isArray(options.render.after)
        ? [...options.render.after, physicsSimulationKey]
        : [options.render.after, physicsSimulationKey]
      : physicsSimulationKey,
    before: options?.render?.before
      ? Array.isArray(options.render.before)
        ? [...options.render.before, renderStage]
        : [options.render.before, renderStage]
      : renderStage
  })

  const started = writable(options?.autoStart ?? true)

  // replacing the original pause and resume functions as well as the paused property
  rapierContext.pause = () => {
    started.set(false)
    stopSimulation()
    stopRender()
  }
  rapierContext.resume = () => {
    started.set(true)
    startSimulation()
    startRender()
  }

  if (!(options?.autoStart ?? true)) {
    rapierContext.pause()
  }

  rapierContext.paused = derived(started, (a) => !a)
}

export const usePhysicsRenderTask = (
  callback: (delta: number) => void,
  options?: Omit<ThrelteUseTaskOptions, 'stage'>
) => {
  return useTask(
    (delta) => {
      callback(delta)
    },
    {
      ...options,
      stage: physicsRenderKey
    }
  )
}

export const usePhysicsTask = (
  callback: (delta: number) => void,
  options?: Omit<ThrelteUseTaskOptions, 'stage'>
) => {
  return useTask(
    (delta) => {
      callback(delta)
    },
    {
      ...options,
      stage: physicsSimulationKey
    }
  )
}
