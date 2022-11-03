import { writable } from 'svelte/store'
import type { Scene, Texture } from 'three'

export const gameScene = writable<Scene | undefined>(undefined)
export const arcadeMachineScene = writable<Scene | undefined>(undefined)

export const gameTexture = writable<Texture | undefined>(undefined)
