import { cubicOut } from 'svelte/easing'
import { Tween } from 'svelte/motion'
import type { Color } from 'three'

const squaredDistance = (a: Color, b: Color) => {
  return (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2
}

export default class {
  // scale based on how close the color is to the end color
  scale = $derived.by(() => {
    const distToStartColor = squaredDistance(this.#color.current, this.startColor)
    const distToEndColor = squaredDistance(this.#color.current, this.endColor)
    return 2 - distToEndColor / (distToStartColor + distToEndColor)
  })
  y = $derived(this.scale - 1)
  #color: Tween<Color>
  constructor(
    public startColor: Color,
    public endColor: Color,
    public x: number,
    public z: number
  ) {
    this.#color = new Tween(startColor, {
      easing: cubicOut,
      duration: 250,
      interpolate(a, b) {
        // need to return a new instance for reactivity to be triggered
        return (t) => a.clone().lerp(b, t)
      }
    })
  }

  get color() {
    return this.#color.current
  }

  up() {
    this.#color.set(this.endColor)
  }

  down() {
    this.#color.set(this.startColor)
  }
}
