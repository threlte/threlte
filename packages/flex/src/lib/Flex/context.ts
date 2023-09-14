import type { CurrentWritable } from '@threlte/core'
import mitt, { type Emitter } from 'mitt'
import { getContext, onDestroy, setContext } from 'svelte'
import type { Group } from 'three'
import type { Node, Yoga } from 'yoga-layout'
import type { Axis, NodeProps } from '../lib/props'

type FlexContextEvents = {
  'reflow:before': void
  'reflow:after': void
}

type FlexContextNode = {
  node: Node
  group: THREE.Group
  props: NodeProps
}

export type FlexContextData = {
  yoga: Yoga
  nodes: Map<Node, FlexContextNode>
  addNode: (node: Node, group: Group, props: NodeProps) => void
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

export type FlexContext = FlexContextData &
  Emitter<FlexContextEvents> & {
    onEvent: <Type extends keyof FlexContextEvents>(
      type: Type,
      callback: (payload: FlexContextEvents[Type]) => void
    ) => void
  }

export const flexContextName = '__threlte-flex'

export const createFlexContext = (data: FlexContextData) => {
  const emitter = mitt<FlexContextEvents>()
  const eventCallback = {
    onEvent: <Type extends keyof FlexContextEvents>(
      type: Type,
      callback: (payload: FlexContextEvents[Type]) => void
    ) => {
      emitter.on(type, callback)
      onDestroy(() => emitter.off(type, callback))
    }
  }
  const context = Object.assign(data, emitter, eventCallback)
  setContext<FlexContext>(flexContextName, context)
  return context
}

export const useFlex = () => {
  return getContext<FlexContext>(flexContextName)
}
