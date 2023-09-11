import mitt, { type Emitter } from 'mitt'
import { onDestroy, onMount, setContext } from 'svelte'
import type { Group } from 'three'
import type { Node, Yoga } from 'yoga-layout'

type FlexContextEvents = {
  'child:add': Node
  'child:remove': Node
  'reflow:before': void
  'reflow:after': void
}

export type FlexContextData = {
  node: Node
  group: Group
  yoga: Yoga
  order: number[]
  addChild: (child: Node) => void
  removeChild: (child: Node) => void
  reflow: () => void
}

export type FlexContext = FlexContextData &
  Emitter<FlexContextEvents> & {
    onEvent: <Type extends keyof FlexContextEvents>(
      type: Type,
      callback: (payload: FlexContextEvents[Type]) => void
    ) => void
  }

export const flexContextName = '__threlte-flex'

export const createFlexContext = (data: FlexContextData): FlexContext => {
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
