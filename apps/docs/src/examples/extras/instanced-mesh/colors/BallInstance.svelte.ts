import { Color } from 'three'
import { Tween } from 'svelte/motion'
import { cubicOut } from 'svelte/easing'

export default class {
  y = new Tween(0, { easing: cubicOut, duration: 250 })
  scale = $derived(this.y.current + 1)
  startColor = new Color()
  endColor = new Color()
  color = $derived(this.startColor.clone().lerpHSL(this.endColor, this.y.current))
  constructor(
    startColor: Color,
    endColor: Color,
    public x: number,
    public z: number
  ) {
    this.startColor.set(startColor)
    this.endColor.set(endColor)
  }
}
