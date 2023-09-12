import mitt, { type Emitter } from 'mitt'
import type { CurrentWritable } from '@threlte/core'
import { onDestroy, setContext } from 'svelte'
import type { Axis } from '../types/types'
import type { Direction, Node, Yoga } from 'yoga-layout'
import type { Group } from 'three'

type RootContextEvents = {
  'reflow:before': void
  'reflow:after': void
}

export type RootContextData = {
  yoga: Yoga
  scaleFactor: CurrentWritable<number>
  mainAxis: CurrentWritable<Axis>
  crossAxis: CurrentWritable<Axis>
  depthAxis: CurrentWritable<Axis>
  rootWidth: CurrentWritable<number>
  rootHeight: CurrentWritable<number>
  rootGroup: Group
  reflow: () => void
}

export type RootContext = RootContextData &
  Emitter<RootContextEvents> & {
    onEvent: <Type extends keyof RootContextEvents>(
      type: Type,
      callback: (payload: RootContextEvents[Type]) => void
    ) => void
  }

export const rootContextName = '__threlte-flex-root'

export const createRootContext = (data: RootContextData) => {
  const emitter = mitt<RootContextEvents>()
  const eventCallback = {
    onEvent: <Type extends keyof RootContextEvents>(
      type: Type,
      callback: (payload: RootContextEvents[Type]) => void
    ) => {
      emitter.on(type, callback)
      onDestroy(() => emitter.off(type, callback))
    }
  }
  const context = Object.assign(data, emitter, eventCallback)
  setContext<RootContext>(rootContextName, context)
  return context
}
