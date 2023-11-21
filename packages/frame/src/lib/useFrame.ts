import { Stage } from './Stage'
import type { AnyContext } from './types'

type UseFrameOptions<
  SchedulerCtx extends AnyContext,
  LoopContext extends AnyContext,
  StageContext extends AnyContext
> = {
  stage?: Stage<SchedulerCtx, LoopContext, StageContext>
}

type ThrelteCtx = {
  foo: string
}

type UseFrameCallback<
  SchedulerCtx extends AnyContext,
  LoopContext extends AnyContext,
  StageContext extends AnyContext
> = (
  delta: number,
  schedulerCtx: SchedulerCtx,
  loopCtx: LoopContext,
  stageCtx: StageContext
) => void

export const useFrame = <
  SchedulerCtx extends AnyContext,
  LoopContext extends AnyContext,
  StageContext extends AnyContext
>(
  callback: UseFrameCallback<SchedulerCtx, LoopContext, StageContext>,
  options?: UseFrameOptions<SchedulerCtx, LoopContext, StageContext>
) => {}

useFrame((delta, ctx) => {}, {
  stage: new Stage<{ foo: number }, { bar: number }, { baz: number }>()
})
