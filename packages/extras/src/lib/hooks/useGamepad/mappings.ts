/**
 * Controller remapping support for `useGamepad`.
 *
 * The browser's Gamepad API only guarantees a consistent layout when
 * `Gamepad.mapping === "standard"`. Many controllers — notably Nintendo Switch
 * Pro, Joy-Cons, and the Switch Online SNES/N64/Genesis pads — commonly report
 * an empty `mapping` string, which means the raw button and axis indices come
 * straight from the HID descriptor and do not match the W3C Standard Gamepad
 * layout. This module provides a small, extensible table of controller-specific
 * remaps so `useGamepad` can expose a consistent position-based API regardless
 * of controller brand.
 *
 * The name of each button in the standard layout (`clusterBottom`, `clusterRight`,
 * `clusterLeft`, `clusterTop`) refers to the physical position of the face
 * button, not the letter printed on it. So on an Xbox pad `clusterBottom === A`,
 * on a DualSense `clusterBottom === Cross`, and on a Nintendo pad
 * `clusterBottom === B`.
 */

/**
 * The standard button names exposed by `useGamepad` in non-XR mode, in the
 * order of the W3C Standard Gamepad button indices.
 */
export const standardButtonNames = [
  'clusterBottom',
  'clusterRight',
  'clusterLeft',
  'clusterTop',
  'leftBumper',
  'rightBumper',
  'leftTrigger',
  'rightTrigger',
  'select',
  'start',
  'leftStickButton',
  'rightStickButton',
  'directionalTop',
  'directionalBottom',
  'directionalLeft',
  'directionalRight',
  'center'
] as const

export type StandardButtonName = (typeof standardButtonNames)[number]

/**
 * Describes where to read a button's state from on a non-standard controller.
 *
 * - `{ button: n }` reads from `pad.buttons[n]`.
 * - `{ axis, ... }` reads from `pad.axes[axis]`. Useful for analog triggers
 *   that some controllers expose as an axis in `[-1, 1]` rather than a button
 *   in `[0, 1]`. The axis value is remapped into `[0, 1]`:
 *   - when `range` is `"unit"` (default) the raw value is treated as a button
 *     value in `[0, 1]` (anything < 0 is clamped to 0).
 *   - when `range` is `"signed"` the axis is assumed to rest at `-1` and reach
 *     `1` when fully pressed, and is normalised to `(raw + 1) / 2`.
 *
 *   `invert` flips the sign of the raw reading before normalisation.
 *   `pressThreshold` controls when the button reports `pressed: true`
 *   (default 0.5 on the normalised value).
 */
export type ButtonSource =
  | { button: number }
  | {
      axis: number
      range?: 'unit' | 'signed'
      invert?: boolean
      pressThreshold?: number
    }

/**
 * Synthesizes directional button states (Top/Bottom/Left/Right) from a single
 * axis that encodes a hat switch. Many Nintendo-style controllers report the
 * D-pad this way on Chromium browsers, using `axes[9]` with eight quantized
 * values around the circle.
 *
 * Each direction field holds the axis values at which that direction should
 * be considered pressed. A diagonal (e.g. up-right) appears in both `up` and
 * `right`. Idle is implied by the absence of a match, so no special neutral
 * value is needed.
 */
export interface HatAxisMapping {
  axis: number
  up: number[]
  right: number[]
  down: number[]
  left: number[]
  /** Absolute-value tolerance used when matching axis values. Default 0.1. */
  tolerance?: number
}

/** Describes how a stick is read from two axes. */
export interface StickAxisMapping {
  xAxis: number
  yAxis: number
  invertX?: boolean
  invertY?: boolean
}

/**
 * A remap entry for a specific non-standard controller.
 *
 * Any field left undefined falls back to the W3C Standard Gamepad layout:
 * `buttons[0..16]` for the standard button indices, `axes[0..1]` for the
 * left stick, and `axes[2..3]` for the right stick.
 *
 * If `dpad` is set, the `directionalTop/Bottom/Left/Right` entries of
 * `buttons` are ignored and directional state is synthesised from the hat
 * axis instead.
 */
export interface GamepadMapping {
  /** Human-readable name for debugging. */
  name?: string
  buttons?: Partial<Record<StandardButtonName, ButtonSource>>
  leftStick?: StickAxisMapping
  rightStick?: StickAxisMapping
  dpad?: HatAxisMapping
}

/**
 * A dictionary of controller remaps keyed by a canonical `vvvv:pppp`
 * signature (hex USB vendor and product IDs, lowercase) derived from
 * `Gamepad.id`.
 */
export type GamepadMappings = Record<string, GamepadMapping>

/**
 * Parse a `Gamepad.id` string into a canonical `vvvv:pppp` signature.
 *
 * Chromium exposes `"Name (Vendor: VVVV Product: PPPP)"`, Firefox exposes
 * `"VVVV-PPPP-Name"`. Returns `null` if neither pattern matches, in which
 * case the caller cannot look up a remap and should fall back to the
 * standard layout.
 */
export const parseGamepadSignature = (id: string): string | null => {
  const chromeMatch = id.match(/Vendor:\s*([0-9a-f]{4}).*?Product:\s*([0-9a-f]{4})/i)
  if (chromeMatch) return `${chromeMatch[1].toLowerCase()}:${chromeMatch[2].toLowerCase()}`
  const firefoxMatch = id.match(/^([0-9a-f]{4})-([0-9a-f]{4})/i)
  if (firefoxMatch) return `${firefoxMatch[1].toLowerCase()}:${firefoxMatch[2].toLowerCase()}`
  return null
}

/**
 * Hat values reported on `axes[9]` by Chromium browsers for controllers
 * that use the W3C "POV hat" convention. Values go clockwise from North (-1.0)
 * in steps of 2/7 ≈ 0.2857; idle is any value outside the match tolerance
 * (commonly ~3.28 on Chromium, but we just don't match any direction there).
 */
const chromiumHat = {
  axis: 9,
  up: [-1.0, -0.7143, 1.0],
  right: [-0.7143, -0.4286, -0.1429],
  down: [-0.1429, 0.1429, 0.4286],
  left: [0.4286, 0.7143, 1.0]
} satisfies HatAxisMapping

/**
 * Built-in mappings for common non-standard controllers.
 *
 * Every browser/OS/connection combination can potentially report a controller
 * differently, so these entries target the most widely reported configurations
 * (Chromium browsers on recent macOS/Windows/Linux, USB and Bluetooth).
 * Users with different setups can override any entry by passing `mappings` to
 * `useGamepad`.
 *
 * Sources:
 * - W3C Gamepad Standard Mapping (https://www.w3.org/TR/gamepad/#remapping)
 * - SDL_GameControllerDB (https://github.com/mdqinc/SDL_GameControllerDB)
 * - Chromium `device/gamepad/gamepad_standard_mappings_*.cc` (per-platform
 *   remapping tables shipped inside the browser itself)
 */
export const builtinMappings: GamepadMappings = {
  /**
   * Nintendo Switch Pro Controller
   *
   * Vendor 057e. Reports `mapping: ""` on Chromium
   * when connected over Bluetooth on macOS, and on Chromium versions that
   * predate the platform-specific Nintendo remap table. Layout below follows
   * the HID report descriptor order used by Chromium's native mapping code:
   *
   *   buttons: B A Y X L R ZL ZR - + Lstick Rstick Home Capture
   *   axes:    leftX leftY rightX rightY [unused ...] hat
   *
   * Position-based names in Threlte's API map as follows:
   *
   *   clusterBottom (south) = B = index 0
   *   clusterRight  (east)  = A = index 1
   *   clusterLeft   (west)  = Y = index 2
   *   clusterTop    (north) = X = index 3
   */
  '057e:2009': {
    name: 'Nintendo Switch Pro Controller',
    buttons: {
      clusterBottom: { button: 0 },
      clusterRight: { button: 1 },
      clusterLeft: { button: 2 },
      clusterTop: { button: 3 },
      leftBumper: { button: 4 },
      rightBumper: { button: 5 },
      leftTrigger: { button: 6 },
      rightTrigger: { button: 7 },
      select: { button: 8 },
      start: { button: 9 },
      leftStickButton: { button: 10 },
      rightStickButton: { button: 11 },
      center: { button: 12 }
    },
    leftStick: { xAxis: 0, yAxis: 1 },
    rightStick: { xAxis: 2, yAxis: 3 },
    dpad: chromiumHat
  },

  /**
   * Nintendo Switch Online SNES Controller
   *
   * Vendor 057e. The front face has the classic SNES layout
   * (Y X / B A + d-pad + Select + Start + L + R shoulders) and the back
   * adds two small ZL / ZR triggers above the shoulder buttons.
   *
   * Button layout was validated against a real controller over Bluetooth on
   * macOS / Chrome (16 buttons, 10 axes, `mapping: ""`). Notable quirk: ZR
   * reports at index 15, not next to ZL at index 6/7 as the W3C standard
   * would suggest — the HID report descriptor on this pad places ZR after
   * several unused button slots. The analog sticks and stick buttons don't
   * exist on this controller, so those entries are intentionally omitted.
   */
  '057e:2017': {
    name: 'Nintendo Switch Online SNES Controller',
    buttons: {
      clusterBottom: { button: 0 },
      clusterRight: { button: 1 },
      clusterLeft: { button: 2 },
      clusterTop: { button: 3 },
      leftBumper: { button: 4 },
      rightBumper: { button: 5 },
      leftTrigger: { button: 6 },
      rightTrigger: { button: 15 },
      select: { button: 8 },
      start: { button: 9 },
      center: { button: 12 }
    },
    dpad: chromiumHat
  },

  /**
   * Nintendo Joy-Con (L)
   *
   * Vendor 057e. Used on its own (sideways) the Joy-Con exposes
   * its arrow pad as four face buttons rather than a D-pad. Sticks are mapped
   * to the left stick only; there is no second analog stick.
   */
  '057e:2006': {
    name: 'Nintendo Joy-Con (L)',
    buttons: {
      clusterBottom: { button: 0 },
      clusterRight: { button: 1 },
      clusterLeft: { button: 2 },
      clusterTop: { button: 3 },
      leftBumper: { button: 4 },
      rightBumper: { button: 5 },
      select: { button: 8 },
      start: { button: 9 },
      leftStickButton: { button: 10 },
      center: { button: 12 }
    },
    leftStick: { xAxis: 0, yAxis: 1 }
  },

  /**
   * Nintendo Joy-Con (R)
   *
   * Vendor 057e. Mirrors the (L) layout on the other hand.
   */
  '057e:2007': {
    name: 'Nintendo Joy-Con (R)',
    buttons: {
      clusterBottom: { button: 0 },
      clusterRight: { button: 1 },
      clusterLeft: { button: 2 },
      clusterTop: { button: 3 },
      leftBumper: { button: 4 },
      rightBumper: { button: 5 },
      select: { button: 8 },
      start: { button: 9 },
      rightStickButton: { button: 11 },
      center: { button: 12 }
    },
    rightStick: { xAxis: 0, yAxis: 1 }
  }
}

/**
 * Look up a remap for the given `Gamepad`. Returns `null` when the pad already
 * uses the Standard Gamepad layout, when its id cannot be parsed into a
 * vendor/product signature, or when no mapping is registered for that pad.
 */
export const resolveMapping = (
  pad: Gamepad,
  userMappings: GamepadMappings | undefined,
  includeBuiltins: boolean
): GamepadMapping | null => {
  if (pad.mapping === 'standard') return null
  const signature = parseGamepadSignature(pad.id)
  if (!signature) return null
  return (
    userMappings?.[signature] ?? (includeBuiltins ? builtinMappings[signature] : undefined) ?? null
  )
}

/**
 * Read a single button's state using an optional remap entry. Falls back to
 * `pad.buttons[defaultIndex]` when no remap is present. The synthesised return
 * for axis-sourced buttons is structurally compatible with `GamepadButton`.
 */
export const readButton = (
  pad: Gamepad,
  source: ButtonSource | undefined,
  defaultIndex: number
): GamepadButton | undefined => {
  if (!source) return pad.buttons[defaultIndex]
  if ('button' in source) return pad.buttons[source.button]

  const raw = pad.axes[source.axis] ?? 0
  const signed = source.invert ? -raw : raw
  const normalised = source.range === 'signed' ? (signed + 1) / 2 : signed
  const value = Math.min(1, Math.max(0, normalised))
  const threshold = source.pressThreshold ?? 0.5
  return {
    pressed: value >= threshold,
    touched: value > 0,
    value
  }
}

/**
 * Read a stick's (x, y) using an optional remap. Falls back to the supplied
 * default axis indices and no inversion when no remap is present.
 */
export const readStick = (
  pad: Gamepad,
  mapping: StickAxisMapping | undefined,
  defaultXAxis: number,
  defaultYAxis: number
): { x: number; y: number } => {
  const xAxis = mapping?.xAxis ?? defaultXAxis
  const yAxis = mapping?.yAxis ?? defaultYAxis
  const x = (pad.axes[xAxis] ?? 0) * (mapping?.invertX ? -1 : 1)
  const y = (pad.axes[yAxis] ?? 0) * (mapping?.invertY ? -1 : 1)
  return { x, y }
}

/** Compute the four directional states from a hat-axis mapping. */
export const readHatDirections = (
  pad: Gamepad,
  hat: HatAxisMapping
): { up: boolean; right: boolean; down: boolean; left: boolean } => {
  const v = pad.axes[hat.axis]
  if (v === undefined) return { up: false, right: false, down: false, left: false }
  const tol = hat.tolerance ?? 0.1
  const matches = (targets: number[]): boolean => targets.some((t) => Math.abs(v - t) < tol)
  return {
    up: matches(hat.up),
    right: matches(hat.right),
    down: matches(hat.down),
    left: matches(hat.left)
  }
}
