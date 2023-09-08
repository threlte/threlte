import { writable } from 'svelte/store'
import { loadYoga } from 'yoga-layout'

let loading = false
let loaded = false

export const yoga = writable<Awaited<ReturnType<typeof loadYoga>> | undefined>(undefined)
export const scaleFactor = writable(100)

const load = async () => {
  if (loading || loaded) return
  const yogaInstance = await loadYoga()
  yoga.set(yogaInstance)
}

load()
