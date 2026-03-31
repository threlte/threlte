import type { ThrelteContext } from '@threlte/core'
import type { WebGLRenderer } from 'three'

/**
 * Workaround for @threlte/test bugs #1, #5:
 * The dom element is detached so clientWidth/Height are 0. Appending it to the
 * container with explicit pixel dimensions gives it real layout. Must wait for
 * ResizeObserver to fire.
 */
export const setupDom = async (context: ThrelteContext<WebGLRenderer>, container: HTMLElement) => {
  const dom = context.dom
  dom.style.width = '200px'
  dom.style.height = '200px'
  container.appendChild(dom)
  await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))
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
