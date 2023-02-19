import { cubicOut } from 'svelte/easing'

export function customSlide(
  node: Element,
  { delay = 0, duration = 400, easing: easing$1 = cubicOut } = {}
) {
  const style = getComputedStyle(node)
  const height = parseFloat(style.height)
  const padding_top = parseFloat(style.paddingTop)
  const padding_bottom = parseFloat(style.paddingBottom)
  const margin_top = parseFloat(style.marginTop)
  const margin_bottom = parseFloat(style.marginBottom)

  return {
    delay,
    duration,
    easing: easing$1,
    css: (t: number) => `transform: translateY(${Math.abs(1 - t) * -100}%);`
  }
}
