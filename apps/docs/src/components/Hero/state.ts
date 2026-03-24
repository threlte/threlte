import { writable } from 'svelte/store'
import type { BufferGeometry } from 'three'

export const debug = writable(false)

export const cubeGeometry = writable<BufferGeometry | undefined>(undefined)
