import { writable } from 'svelte/store'

export const regen = writable(false)
export const seed = writable('123456789')
