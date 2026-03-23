import { Tween } from 'svelte/motion'

const duration = 100

export class Card {
  radius = new Tween(0.1, { duration })
  scale = new Tween(1, { duration })
  zoom = new Tween(1, { duration })
  url: string
  constructor(url: string) {
    this.url = url
  }
}
