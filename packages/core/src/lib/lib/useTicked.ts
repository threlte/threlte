import { tick } from 'svelte'
import { writable, type Writable } from 'svelte/store'

export const useTicked = (): Writable<boolean> => {
  const ticked = writable(false)

  const init = async () => {
    await tick()
    ticked.set(true)
  }

  init()

  return ticked
}
