import { cubicOut } from 'svelte/easing'

export function customSlide(
  _: Element,
  { delay = 0, duration = 400, easing: easing$1 = cubicOut } = {}
) {
  return {
    delay,
    duration,
    easing: easing$1,
    css: (t: number) => `transform: translateY(${Math.abs(1 - t) * -100}%);`
  }
}
