import mitt, { type Emitter } from 'mitt'
import type { CurrentWritable } from '@threlte/core'
import { onDestroy, setContext } from 'svelte'
import type { Axis } from '../types/types'
import type { Direction, Node, Yoga } from 'yoga-layout'
import type { Group } from 'three'
import type { NodeProps } from '../lib/props'

type RootContextEvents = {
  'reflow:before': void
  'reflow:after': void
}

type RootContextNode = {
  node: Node
  group: THREE.Group
  props: NodeProps
  type: 'container' | 'item'
}

export type RootContextData = {
  yoga: Yoga
  nodes: Map<Node, RootContextNode>
  addNode: (node: Node, group: Group, props: NodeProps, type: 'container' | 'item') => void
  updateNodeProps: (node: Node, props: NodeProps, force?: boolean) => void
  removeNode: (node: Node) => void
  scaleFactor: CurrentWritable<number>
  mainAxis: CurrentWritable<Axis>
  crossAxis: CurrentWritable<Axis>
  depthAxis: CurrentWritable<Axis>
  rootGroup: Group
  rootWidth: CurrentWritable<number>
  rootHeight: CurrentWritable<number>
  reflow: (msg?: string) => void
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
