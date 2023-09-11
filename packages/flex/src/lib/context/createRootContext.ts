import type { CurrentWritable } from '@threlte/core'
import { setContext } from 'svelte'
import type { Axis } from '../types/types'
import type { Direction } from 'yoga-layout'

export type RootContextData = {
  scaleFactor: CurrentWritable<number>
  mainAxis: CurrentWritable<Axis>
  crossAxis: CurrentWritable<Axis>
  depthAxis: CurrentWritable<Axis>
  direction: CurrentWritable<Direction>
  rootWidth: CurrentWritable<number>
  rootHeight: CurrentWritable<number>
}

export const rootContextName = '__threlte-flex-root'

export const createRootContext = (data: RootContextData) => {
  setContext<RootContextData>(rootContextName, data)
  return data
}
