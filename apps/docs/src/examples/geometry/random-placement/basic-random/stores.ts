import { writable } from 'svelte/store'

export const regen = writable(false)
export const numberOfObjects = writable(50)
