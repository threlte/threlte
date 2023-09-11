import mitt, { type Emitter } from 'mitt'
import { onDestroy, onMount, setContext } from 'svelte'
import type { Node, Yoga } from 'yoga-layout'

type FlexContextEvents = {
  'child:add': Node
  'child:remove': Node
  'layout:change': void
}

export type FlexContextData = {
  node: Node
  yoga: Yoga
  order: number[]
  addChild: (child: Node) => void
  removeChild: (child: Node) => void
}

type EventCallback = <Type extends keyof FlexContextEvents>(
  type: Type,
  payload: FlexContextEvents[Type]
) => void

export type FlexContext = FlexContextData &
  Emitter<FlexContextEvents> & {
    onEvent: (callback: EventCallback) => void
  }

export const flexContextName = '__threlte-flex'

export const createFlexContext = (data: FlexContextData): FlexContext => {
  const emitter = mitt<FlexContextEvents>()
  const eventCallback = {
    onEvent: (callback: EventCallback) => {
      emitter.on('*', callback)
      onDestroy(() => emitter.off('*', callback))
    }
  }
  const context = Object.assign(data, emitter, eventCallback)
  setContext<FlexContext>(flexContextName, context)
  return context
}
