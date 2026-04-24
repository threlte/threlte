import type { XRGripSpace, XRHandSpace, XRTargetRaySpace } from 'three'
import type { XRControllerModel } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'
import type { XRHandModel } from 'three/examples/jsm/webxr/XRHandModelFactory.js'
import type { XRControllerEvents, XRHandEvents } from '../types.js'

export type XRHandInputSource = XRInputSource & { hand: XRHand }

export type XRInputSourceStateBase = {
  id: string
  inputSource: XRInputSource
  handedness: XRHandedness
  isPrimary: boolean
  events: ReadonlyArray<XRInputSourceEvent>
  targetRay: XRTargetRaySpace
}

export type XRControllerSourceState = XRInputSourceStateBase & {
  type: 'controller'
  grip: XRGripSpace
  model: XRControllerModel
}

export type XRHandSourceState = Omit<XRInputSourceStateBase, 'inputSource'> & {
  type: 'hand'
  inputSource: XRHandInputSource
  hand: XRHandSpace
  model: XRHandModel
}

export type XRGazeSourceState = XRInputSourceStateBase & { type: 'gaze' }
export type XRTransientPointerSourceState = XRInputSourceStateBase & { type: 'transientPointer' }
export type XRScreenInputSourceState = XRInputSourceStateBase & { type: 'screenInput' }

export type XRInputSourceState =
  | XRControllerSourceState
  | XRHandSourceState
  | XRGazeSourceState
  | XRTransientPointerSourceState
  | XRScreenInputSourceState

class InputSourcesState {
  current = $state.raw<ReadonlyArray<XRInputSourceState>>([])
}

export const inputSources = new InputSourcesState()
export const inputSourceStates = inputSources

export type ControllerSubscriber = {
  type: 'controller'
  handedness: XRHandedness
  callbacks: XRControllerEvents
}

export type HandSubscriber = {
  type: 'hand'
  handedness: 'left' | 'right'
  callbacks: XRHandEvents
}

export type Subscriber = ControllerSubscriber | HandSubscriber

const subscribers = new Set<Subscriber>()

export const addSubscriber = (sub: Subscriber) => {
  subscribers.add(sub)
  return () => {
    subscribers.delete(sub)
  }
}

export const dispatchEvent = (state: XRInputSourceState, eventType: string, event: unknown) => {
  const key = `on${eventType}` as keyof XRControllerEvents & keyof XRHandEvents
  for (const sub of subscribers) {
    if (sub.type !== state.type) continue
    if (sub.handedness !== state.handedness) continue
    const cb = (sub.callbacks as Record<string, ((e: unknown) => void) | undefined>)[key]
    cb?.(event)
  }
}

type ResolveOptions = {
  isPrimary?: boolean
}

const getPreferredState = <Type extends XRInputSourceState>(
  predicate: (state: XRInputSourceState) => state is Type,
  options?: ResolveOptions
) => {
  if (options?.isPrimary !== undefined) {
    return inputSources.current.find(
      (state): state is Type => state.isPrimary === options.isPrimary && predicate(state)
    )
  }

  return (
    inputSources.current.find((state): state is Type => state.isPrimary && predicate(state)) ??
    inputSources.current.find(predicate)
  )
}

export const getInputSourceState = (inputSource: XRInputSource, options?: ResolveOptions) => {
  if (options?.isPrimary !== undefined) {
    return inputSources.current.find(
      (state) => state.inputSource === inputSource && state.isPrimary === options.isPrimary
    )
  }

  return inputSources.current.find((state) => state.inputSource === inputSource)
}

export const getControllerState = (handedness: XRHandedness, options?: ResolveOptions) => {
  return getPreferredState(
    (state): state is XRControllerSourceState =>
      state.type === 'controller' && state.handedness === handedness,
    options
  )
}

export const getHandState = (handedness: 'left' | 'right', options?: ResolveOptions) => {
  return getPreferredState(
    (state): state is XRHandSourceState => state.type === 'hand' && state.handedness === handedness,
    options
  )
}

export const dispatchInputSourceEvent = (
  inputSource: XRInputSource,
  eventType: string,
  event: unknown
) => {
  const state = getInputSourceState(inputSource)
  if (state === undefined) return
  dispatchEvent(state, eventType, event)
}
