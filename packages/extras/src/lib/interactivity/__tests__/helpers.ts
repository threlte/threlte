import type { ThrelteContext } from '@threlte/core'
import type { WebGLRenderer } from 'three'

/**
 * We poll until the size is actually non-zero rather than hoping rAF timing aligns with
 * ResizeObserver — this eliminates flakiness in CI.
 */
export const setupDom = async (context: ThrelteContext<WebGLRenderer>) => {
  await new Promise<void>((resolve) => {
    const check = () => {
      if (context.size.current.width > 0 && context.size.current.height > 0) {
        // Extra frame to allow all ResizeObservers (including interactivity's)
        // to process the layout change.
        requestAnimationFrame(() => resolve())
      } else {
        requestAnimationFrame(check)
      }
    }
    requestAnimationFrame(check)
  })
}

/**
 * Dispatch a pointer event at position (x, y) relative to the target element.
 * offsetX/offsetY are read-only computed properties that Chromium computes
 * unreliably for synthetic events (@threlte/test bug #6), so we override them.
 */
export const pointer = (target: HTMLElement, type: string, x = 100, y = 100) => {
  const event = new PointerEvent(type, {
    bubbles: true,
    pointerId: 1,
    clientX: x,
    clientY: y
  })
  Object.defineProperty(event, 'offsetX', { value: x })
  Object.defineProperty(event, 'offsetY', { value: y })
  target.dispatchEvent(event)
}

/**
 * Dispatch a wheel event at position (x, y) relative to the target element.
 */
export const wheel = (target: HTMLElement, x = 100, y = 100, deltaY = 100) => {
  const event = new WheelEvent('wheel', {
    bubbles: true,
    clientX: x,
    clientY: y,
    deltaY
  })
  Object.defineProperty(event, 'offsetX', { value: x })
  Object.defineProperty(event, 'offsetY', { value: y })
  target.dispatchEvent(event)
}

/**
 * Wait for a requestAnimationFrame to fire (needed for throttled pointermove).
 */
export const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()))
