import { getContext, setContext } from 'svelte'
import { useGamepad, useInputMap, useKeyboard } from '@threlte/extras'

const CONTROLS_KEY = Symbol('arcade-controls')

/**
 * Sets up keyboard + gamepad + input map for the arcade game and publishes
 * the resulting action handles through Svelte context. Call once from the
 * root scene; children read actions via {@link useArcadeControls}.
 */
export const provideArcadeControls = () => {
  const keyboard = useKeyboard()
  const gamepad = useGamepad()

  const controls = useInputMap(
    (map) => ({
      left: [
        map.key('ArrowLeft'),
        map.gamepadButton('directionalLeft'),
        map.gamepadAxis('leftStick', 'x', -1)
      ],
      right: [
        map.key('ArrowRight'),
        map.gamepadButton('directionalRight'),
        map.gamepadAxis('leftStick', 'x', 1)
      ],
      advance: [
        map.key(' '),
        map.gamepadButton('clusterBottom'),
        map.gamepadButton('start')
      ],
      toggleDebug: [map.key('d')],
      toggleOrbit: [map.key('o')]
    }),
    { keyboard, gamepad }
  )

  setContext(CONTROLS_KEY, controls)
  return controls
}

export type ArcadeControls = ReturnType<typeof provideArcadeControls>

export const useArcadeControls = (): ArcadeControls => {
  const controls = getContext<ArcadeControls | undefined>(CONTROLS_KEY)
  if (!controls) {
    throw new Error(
      'useArcadeControls(): no arcade controls in context. Did you forget to call provideArcadeControls() in a parent component?'
    )
  }
  return controls
}
