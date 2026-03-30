import { getContext, setContext, untrack } from 'svelte'
import { type CurrentWritable, runeToCurrentWritable } from '../../utilities/currentWritable.js'
import { Scheduler, type Stage } from '../../frame-scheduling/index.js'

export type SchedulerContext = {
  /** The scheduler used by this Threlte app */
  scheduler: Scheduler

  /**
   * If set to 'on-demand', the scene will only be rendered when the current frame is invalidated
   * If set to 'manual', the scene will only be rendered when advance() is called
   * If set to 'always', the scene will be rendered every frame
   *
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
  frameInvalidated: { current: boolean }

  /** If anything is in this set, the frame will be considered invalidated */
  autoInvalidations: Set<unknown>

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

  /** The stage which useTask defaults to */
  mainStage: Stage

  /**
   * The default render stage. Tasks in this stage are ran according to
   * on-demand rendering.
   */
  renderStage: Stage

  /**
   * @deprecated Use invalidate()
   */
  advance: () => void

  /**
   * @deprecated Use frameInvalidated.current = false
   */
  resetFrameInvalidation: () => void
}

export type CreateSchedulerContextOptions = {
  autoRender?: boolean
  renderMode?: 'always' | 'on-demand' | 'manual'
}

export const createSchedulerContext = (
  options: () => CreateSchedulerContextOptions
): SchedulerContext => {
  const scheduler = new Scheduler()
  const mainStage = scheduler.createStage(Symbol('threlte-main-stage'))

  const opts = $derived(options())

  let autoRender = $state(opts.autoRender ?? true)
  $effect.pre(() => {
    if (opts) {
      untrack(() => (autoRender = opts.autoRender ?? true))
    }
  })

  let renderMode = $state(opts.renderMode ?? 'on-demand')
  $effect.pre(() => {
    if (opts) {
      untrack(() => (renderMode = opts.renderMode ?? 'on-demand'))
    }
  })

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
    frameInvalidated: {
      get current() {
        return frameInvalidated
      },
      set current(value) {
        frameInvalidated = value
      }
    },
    advance: () => {
      frameInvalidated = true
    },
    autoRender: runeToCurrentWritable(
      () => autoRender,
      (value) => (autoRender = value)
    ),
    renderMode: runeToCurrentWritable(
      () => renderMode,
      (value) => (renderMode = value)
    ),
    invalidate() {
      frameInvalidated = true
    },
    resetFrameInvalidation() {
      frameInvalidated = false
    },
    mainStage,
    shouldRender,
    renderStage: scheduler.createStage(Symbol('threlte-render-stage'), {
      after: mainStage,
      callback(_, runTasks) {
        if (context.shouldRender()) runTasks()
      }
    })
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
