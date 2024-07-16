import { getContext, onDestroy, setContext } from 'svelte'
import { type CurrentWritable, currentWritable } from '../../lib/storeUtils'
import { Scheduler, type Stage } from '../../frame-scheduling'

export type SchedulerContext = {
  scheduler: Scheduler
  /**
   * @default 'on-demand'
   */
  renderMode: CurrentWritable<'always' | 'on-demand' | 'manual'>
  /**
   * By default, Threlte will automatically render the scene. To implement
   * custom render pipelines, set this to `false`.
   *
   * @default true
   */
  autoRender: CurrentWritable<boolean>
  /** A flag to indicate whether the current frame has been invalidated */
  frameInvalidated: boolean
  /** Advance one frame when renderMode === 'manual' */
  advance: () => void
  /** A flag to indicate whether the frame should be advanced in the manual renderMode */
  shouldAdvance: boolean
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

  const context: SchedulerContext = {
    scheduler,
    frameInvalidated: true,
    autoInvalidations: new Set(),
    shouldAdvance: false,
    advance: () => {
      context.shouldAdvance = true
    },
    autoRender: currentWritable(options.autoRender ?? true),
    renderMode: currentWritable(options.renderMode ?? 'on-demand'),
    invalidate() {
      context.frameInvalidated = true
    },
    mainStage,
    shouldRender: () => {
      return (
        context.renderMode.current === 'always' ||
        (context.renderMode.current === 'on-demand' &&
          (context.frameInvalidated || context.autoInvalidations.size > 0)) ||
        (context.renderMode.current === 'manual' && context.shouldAdvance)
      )
    },
    renderStage: scheduler.createStage(Symbol('threlte-render-stage'), {
      after: mainStage,
      callback(_, runTasks) {
        if (context.shouldRender()) runTasks()
      }
    }),
    resetFrameInvalidation() {
      context.frameInvalidated = false
      context.shouldAdvance = false
    }
  }

  $effect(() => {
    context.autoRender.set(options.autoRender ?? true)
  })
  $effect(() => {
    context.renderMode.set(options.renderMode ?? 'on-demand')
  })

  onDestroy(() => {
    context.scheduler.dispose()
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
