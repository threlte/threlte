import { writable } from 'svelte/store'
import type { Texture } from 'three'

export const alphaThreshold = writable(0.5)
export const alphaSmoothing = writable(0.15)
export const brightness = writable(0)
export const contrast = writable(0)
export const hue = writable(0)
export const saturation = writable(0)
export const lightness = writable(0)
export const negative = writable(false)
export const monochromeColor = writable('#ed8922')
export const monochromeStrength = writable(0)
export const textureOverrideEnabled = writable(false)
export const colorProcessingTexture = writable<Texture | undefined>()
