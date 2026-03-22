import { getContext, setContext } from 'svelte'
import { Scheduler, type Stage } from '../../frame-scheduling/index.js'

export type SchedulerContext = {
  scheduler: Scheduler
  /**
   * @default 'on-demand'
   */
  renderMode: {
    readonly current: 'always' | 'on-demand' | 'manual'
    set: (value: 'always' | 'on-demand' | 'manual') => void
  }

  /**
   * By default, Threlte will automatically render the scene. To implement
   * custom render pipelines, set this to `false`.
   *
   * @default true
   */
  autoRender: {
    readonly current: boolean
    set: (value: boolean) => void
  }

  /** A flag to indicate whether the current frame has been invalidated */
  frameInvalidated: boolean

  /** If anything is in this set, the frame will be considered invalidated */
  autoInvalidations: Set<unknown>

  /** A function to be called at the end of the frame loop that resets the invalidation flags */
  resetFrameInvalidation: () => void

  /**
   * Function to determine if a rendering should happen according to on-demand
   * rendering. The value of this function is valid for the duration of the
   * current frame.
   */
  shouldRender: () => boolean

  /**
   * Invalidates the current frame when renderMode === 'on-demand'
   */
  invalidate: () => void

  mainStage: Stage

  renderStage: Stage
}

export type CreateSchedulerContextOptions = {
  autoRender?: boolean
  renderMode?: 'always' | 'on-demand' | 'manual'
}

export const createSchedulerContext = (
  options: CreateSchedulerContextOptions
): SchedulerContext => {
  const scheduler = new Scheduler()
  const mainStage = scheduler.createStage(Symbol('threlte-main-stage'))

  let autoRender = $state(options.autoRender ?? true)
  let renderMode = $state(options.renderMode ?? 'on-demand')

  const autoInvalidations = new Set()

  let frameInvalidated = true

  const shouldRender = () => {
    return (
      renderMode === 'always' ||
      (renderMode === 'on-demand' && (frameInvalidated || autoInvalidations.size > 0)) ||
      (renderMode === 'manual' && frameInvalidated)
    )
  }

  const context: SchedulerContext = {
    scheduler,
    autoInvalidations,
    get frameInvalidated() {
      return frameInvalidated
    },
    autoRender: {
      get current() {
        return autoRender
      },
      set(value: boolean) {
        autoRender = value
      }
    },
    renderMode: {
      get current() {
        return renderMode
      },
      set(value: 'always' | 'on-demand' | 'manual') {
        renderMode = value
      }
    },
    invalidate() {
      frameInvalidated = true
    },
    mainStage,
    shouldRender,
    renderStage: scheduler.createStage(Symbol('threlte-render-stage'), {
      after: mainStage,
      callback(_, runTasks) {
        if (shouldRender()) {
          runTasks()
        }
      }
    }),
    resetFrameInvalidation() {
      frameInvalidated = false
    }
  }

  $effect(() => {
    return () => {
      scheduler.dispose()
    }
  })

  setContext<SchedulerContext>('threlte-scheduler-context', context)

  return context
}

export const useScheduler = (): SchedulerContext => {
  const context = getContext<SchedulerContext>('threlte-scheduler-context')

  if (!context) {
    throw new Error('useScheduler can only be used in a child component to <Canvas>.')
  }

  return context
}
