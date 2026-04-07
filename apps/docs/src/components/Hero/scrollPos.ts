import { Spring } from 'svelte/motion'
import { writable, derived, toStore } from 'svelte/store'

export const scrollPos = writable(0)

/**
 * do not use, may be negative!
 */
export const _springScrollPos = new Spring(0, {
  precision: 0.0000001,
  damping: 0.95,
  stiffness: 0.1
})

export const springScrollPos = derived(
  toStore(() => _springScrollPos.current),
  (pos) => Math.max(0, pos)
)

export const mouseCoords = writable({ x: 0, y: 0 })

export const mouseCoordsSpring = new Spring({ x: 0, y: 0 })
