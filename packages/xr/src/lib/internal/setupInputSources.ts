import {
  Group,
  Vector3,
  type XRGripSpace,
  type XRHandSpace,
  type XRJointSpace,
  type XRTargetRaySpace
} from 'three'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js'
import { useTask, useThrelte } from '@threlte/core'
import {
  createInputSourceEvent,
  dispatchInputSourceStateEvent,
  inputSources,
  type XRControllerSourceState,
  type XRHandInputSource,
  type XRHandSourceState,
  type XRInputSourceState
} from './inputSources.svelte.js'

const PINCH_DISTANCE = 0.02
const PINCH_THRESHOLD = 0.005

const makeId = (inputSource: XRInputSource) =>
  `${inputSource.handedness}-${inputSource.hand ? 'hand' : 'nohand'}-${inputSource.targetRayMode}-${inputSource.profiles.join(',')}`

type XRSpaceWithVelocity = (XRTargetRaySpace | XRGripSpace) & {
  hasLinearVelocity: boolean
  linearVelocity: Vector3
  hasAngularVelocity: boolean
  angularVelocity: Vector3
}

type XRHandGroup = XRHandSpace & {
  joints: Partial<Record<XRHandJoint, XRJointSpace>>
  inputState: { pinching: boolean }
}

type XRInputJoint = globalThis.XRJointSpace & { jointName: XRHandJoint }
type MutableXRJointSpace = XRJointSpace & { jointRadius?: number }

type InputSourceChanges =
  | Array<{
      isPrimary: boolean
      added?: XRInputSourceArray | ReadonlyArray<XRInputSource>
      removed?: XRInputSourceArray | ReadonlyArray<XRInputSource>
    }>
  | 'remove-all'

const createSpaceWithVelocity = <Space extends XRTargetRaySpace | XRGripSpace>() => {
  const group = new Group() as Space & XRSpaceWithVelocity
  group.matrixAutoUpdate = false
  group.visible = false
  group.hasLinearVelocity = false
  group.linearVelocity = new Vector3()
  group.hasAngularVelocity = false
  group.angularVelocity = new Vector3()
  return group
}

const createTargetRaySpace = () => createSpaceWithVelocity<XRTargetRaySpace>()
const createGripSpace = () => createSpaceWithVelocity<XRGripSpace>()

const createHandSpace = () => {
  const hand = new Group() as XRHandGroup
  hand.matrixAutoUpdate = false
  hand.visible = false
  hand.joints = {}
  hand.inputState = { pinching: false }
  return hand
}

const hideState = (state: XRInputSourceState) => {
  state.targetRay.visible = false

  if (state.type === 'controller') {
    state.grip.visible = false
  }

  if (state.type === 'hand') {
    state.hand.visible = false
    for (const joint of Object.values((state.hand as XRHandGroup).joints ?? {})) {
      joint.visible = false
    }
    state.hand.inputState.pinching = false
  }
}

const ensureHandJoint = (hand: XRHandGroup, inputJoint: XRInputJoint): MutableXRJointSpace => {
  const existing = hand.joints[inputJoint.jointName]
  if (existing !== undefined) {
    return existing as MutableXRJointSpace
  }

  const joint = new Group() as MutableXRJointSpace
  joint.matrixAutoUpdate = false
  joint.visible = false
  hand.joints[inputJoint.jointName] = joint
  hand.add(joint)

  return joint
}

const ensureHandJoints = (state: XRHandSourceState) => {
  const hand = state.hand as XRHandGroup

  for (const inputJoint of state.inputSource.hand.values()) {
    ensureHandJoint(hand, inputJoint as XRInputJoint)
  }
}

const updateSpacePose = (
  space: XRTargetRaySpace | XRGripSpace,
  pose: XRPose | undefined | null
) => {
  if (pose === undefined || pose === null) {
    space.visible = false
    ;(space as XRSpaceWithVelocity).hasLinearVelocity = false
    ;(space as XRSpaceWithVelocity).hasAngularVelocity = false
    return
  }

  space.matrix.fromArray(pose.transform.matrix)
  space.matrix.decompose(space.position, space.quaternion, space.scale)
  space.matrixWorldNeedsUpdate = true
  space.visible = true

  if (
    'linearVelocity' in pose &&
    pose.linearVelocity !== null &&
    pose.linearVelocity !== undefined
  ) {
    ;(space as XRSpaceWithVelocity).hasLinearVelocity = true
    ;(space as XRSpaceWithVelocity).linearVelocity.copy(pose.linearVelocity)
  } else {
    ;(space as XRSpaceWithVelocity).hasLinearVelocity = false
  }

  if (
    'angularVelocity' in pose &&
    pose.angularVelocity !== null &&
    pose.angularVelocity !== undefined
  ) {
    ;(space as XRSpaceWithVelocity).hasAngularVelocity = true
    ;(space as XRSpaceWithVelocity).angularVelocity.copy(pose.angularVelocity)
  } else {
    ;(space as XRSpaceWithVelocity).hasAngularVelocity = false
  }
}

const updatePinchState = (state: XRHandSourceState) => {
  const hand = state.hand as XRHandGroup
  const inputState = hand.inputState
  const indexTip = hand.joints['index-finger-tip']
  const thumbTip = hand.joints['thumb-tip']

  if (indexTip === undefined || thumbTip === undefined || !indexTip.visible || !thumbTip.visible) {
    if (inputState.pinching) {
      inputState.pinching = false
      const event = createInputSourceEvent(state, 'pinchend', {
        handedness: state.handedness,
        target: hand,
        __threlteSynthetic: true
      })
      dispatchInputSourceStateEvent(state, 'pinchend', event)
    }
    return
  }

  const distance = indexTip.position.distanceTo(thumbTip.position)

  if (inputState.pinching && distance > PINCH_DISTANCE + PINCH_THRESHOLD) {
    inputState.pinching = false
    const event = createInputSourceEvent(state, 'pinchend', {
      handedness: state.handedness,
      target: hand,
      __threlteSynthetic: true
    })
    dispatchInputSourceStateEvent(state, 'pinchend', event)
  } else if (!inputState.pinching && distance <= PINCH_DISTANCE - PINCH_THRESHOLD) {
    inputState.pinching = true
    const event = createInputSourceEvent(state, 'pinchstart', {
      handedness: state.handedness,
      target: hand,
      __threlteSynthetic: true
    })
    dispatchInputSourceStateEvent(state, 'pinchstart', event)
  }
}

const updateXRControllerState = (
  state: XRControllerSourceState,
  frame: XRFrame,
  referenceSpace: XRReferenceSpace
) => {
  let gripPose: XRPose | undefined | null

  if (state.inputSource.gripSpace !== undefined) {
    gripPose = frame.getPose(state.inputSource.gripSpace, referenceSpace)
    updateSpacePose(state.grip, gripPose)
  }

  let targetRayPose = frame.getPose(state.inputSource.targetRaySpace, referenceSpace)
  if (targetRayPose === null && gripPose !== undefined && gripPose !== null) {
    targetRayPose = gripPose
  }
  updateSpacePose(state.targetRay, targetRayPose)

  if (state.inputSource.gripSpace === undefined || gripPose === undefined || gripPose === null) {
    updateSpacePose(state.grip, targetRayPose)
  }
}

const updateXRHandState = (
  state: XRHandSourceState,
  frame: XRFrame,
  referenceSpace: XRReferenceSpace
) => {
  updateSpacePose(state.targetRay, frame.getPose(state.inputSource.targetRaySpace, referenceSpace))

  const hand = state.hand as XRHandGroup
  ensureHandJoints(state)

  let visible = false
  for (const inputJoint of state.inputSource.hand.values()) {
    const pose = frame.getJointPose?.(inputJoint, referenceSpace)
    const joint = ensureHandJoint(hand, inputJoint as XRInputJoint)

    if (pose !== undefined && pose !== null) {
      joint.matrix.fromArray(pose.transform.matrix)
      joint.matrix.decompose(joint.position, joint.quaternion, joint.scale)
      joint.matrixWorldNeedsUpdate = true
      joint.jointRadius = pose.radius
      visible = true
    }

    joint.visible = pose !== undefined && pose !== null
  }

  hand.visible = visible
  updatePinchState(state)
}

const updateXRInputSourceState = (
  state: XRInputSourceState,
  frame: XRFrame,
  referenceSpace: XRReferenceSpace
) => {
  if (
    frame.session.visibilityState === 'visible-blurred' ||
    frame.session.visibilityState === 'hidden'
  ) {
    hideState(state)
    return
  }

  switch (state.type) {
    case 'controller':
      updateXRControllerState(state, frame, referenceSpace)
      break
    case 'hand':
      updateXRHandState(state, frame, referenceSpace)
      break
    default:
      updateSpacePose(
        state.targetRay,
        frame.getPose(state.inputSource.targetRaySpace, referenceSpace)
      )
      break
  }
}

let idCounter = 0

const createXRInputSourceState = (
  id: string,
  inputSource: XRInputSource,
  isPrimary: boolean,
  controllerModelFactory: XRControllerModelFactory,
  handModelFactory: XRHandModelFactory
): XRInputSourceState | undefined => {
  const base = {
    id,
    inputSource,
    handedness: inputSource.handedness,
    isPrimary,
    targetRay: createTargetRaySpace()
  }

  if (inputSource.hand != null) {
    if (inputSource.handedness === 'none') return undefined

    const hand = createHandSpace()
    const state: XRHandSourceState = {
      ...base,
      type: 'hand',
      inputSource: inputSource as XRHandInputSource,
      hand,
      model: handModelFactory.createHandModel(hand, 'mesh')
    }
    ensureHandJoints(state)
    return state
  }

  switch (inputSource.targetRayMode) {
    case 'gaze':
      return { ...base, type: 'gaze' }
    case 'screen':
      return { ...base, type: 'screenInput' }
    case 'transient-pointer':
      return { ...base, type: 'transientPointer' }
    case 'tracked-pointer':
    default: {
      const grip = createGripSpace()
      return {
        ...base,
        type: 'controller',
        grip,
        model: controllerModelFactory.createControllerModel(grip)
      }
    }
  }
}

const createSyncXRInputSourceStates = (
  controllerModelFactory: XRControllerModelFactory,
  handModelFactory: XRHandModelFactory
) => {
  const idMap = new Map<string, string>()

  return (
    _session: XRSession,
    current: ReadonlyArray<XRInputSourceState>,
    changes: InputSourceChanges
  ): ReadonlyArray<XRInputSourceState> => {
    if (changes === 'remove-all') {
      for (const state of current) {
        const event = createInputSourceEvent(state, 'disconnected', {
          __threlteSynthetic: true
        })
        dispatchInputSourceStateEvent(state, 'disconnected', event)
        hideState(state)
      }
      return []
    }

    const target = [...current]

    for (const { added, isPrimary, removed } of changes) {
      if (removed != null) {
        for (const inputSource of removed) {
          const index = target.findIndex(
            (state) => state.isPrimary === isPrimary && state.inputSource === inputSource
          )
          if (index === -1) continue

          const [state] = target.splice(index, 1)

          const event = createInputSourceEvent(state, 'disconnected', {
            __threlteSynthetic: true
          })
          dispatchInputSourceStateEvent(state, 'disconnected', event)
          hideState(state)
        }
      }

      if (added == null) continue

      for (const inputSource of added) {
        if (
          target.some((state) => state.isPrimary === isPrimary && state.inputSource === inputSource)
        ) {
          continue
        }

        const key = makeId(inputSource)

        let id = idMap.get(key)
        if (id == null) {
          id = `${idCounter++}`
          idMap.set(key, id)
        }

        const state = createXRInputSourceState(
          id,
          inputSource,
          isPrimary,
          controllerModelFactory,
          handModelFactory
        )

        if (state === undefined) {
          continue
        }

        target.push(state)

        const event = createInputSourceEvent(state, 'connected', {
          __threlteSynthetic: true
        })
        dispatchInputSourceStateEvent(state, 'connected', event)
      }
    }

    return target
  }
}

const createBindToSession = (
  syncXRInputSourceStates: ReturnType<typeof createSyncXRInputSourceStates>
) => {
  let cleanupSession: (() => void) | undefined

  return (session: XRSession | undefined) => {
    cleanupSession?.()
    cleanupSession = undefined

    if (session == null) {
      inputSources.current = []
      return
    }

    const inputSourceChangesList: Exclude<InputSourceChanges, 'remove-all'> = []

    const applySourcesChange = () => {
      inputSources.current = syncXRInputSourceStates(
        session,
        inputSources.current,
        inputSourceChangesList
      )
      inputSourceChangesList.length = 0
    }

    const onInputSourcesChange = (event: XRInputSourcesChangeEvent) => {
      inputSourceChangesList.push({
        isPrimary: true,
        added: event.added,
        removed: event.removed
      })
      applySourcesChange()
    }

    session.addEventListener('inputsourceschange', onInputSourcesChange)

    inputSources.current = syncXRInputSourceStates(
      session,
      [],
      [{ isPrimary: true, added: session.inputSources }]
    )

    cleanupSession = () => {
      inputSources.current = syncXRInputSourceStates(session, inputSources.current, 'remove-all')
      session.removeEventListener('inputsourceschange', onInputSourcesChange)
    }
  }
}

export type BindInputSourcesToSession = (session: XRSession | undefined) => void

export const setupInputSources = (
  controllerFactory?: XRControllerModelFactory,
  handFactory?: XRHandModelFactory
): BindInputSourcesToSession => {
  const { xr } = useThrelte().renderer
  const controllerModelFactory = controllerFactory ?? new XRControllerModelFactory()
  const handModelFactory = handFactory ?? new XRHandModelFactory()
  const syncXRInputSourceStates = createSyncXRInputSourceStates(
    controllerModelFactory,
    handModelFactory
  )
  const bindToSession = createBindToSession(syncXRInputSourceStates)

  useTask(
    () => {
      const frame = xr.getFrame()
      const referenceSpace = xr.getReferenceSpace()

      if (frame === null || referenceSpace === null) return

      for (const state of inputSources.current) {
        updateXRInputSourceState(state, frame, referenceSpace)
      }
    },
    {
      running: () => inputSources.current.length > 0
    }
  )

  return bindToSession
}
