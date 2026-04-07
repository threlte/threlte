import { elasticOut } from 'svelte/easing'
import { Tween } from 'svelte/motion'

const duration = 800

export class Card {
  radius = new Tween(0.1, { duration, easing: elasticOut })
  scale = new Tween(1, { duration, easing: elasticOut })
  zoom = new Tween(1, { duration, easing: elasticOut })
  url: string
  constructor(url: string) {
    this.url = url
  }
}
