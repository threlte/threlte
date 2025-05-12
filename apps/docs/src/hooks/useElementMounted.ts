import { writable } from 'svelte/store'

export const useElementMounted = () => {
  const mounted = writable(false)

  const action = (_node: HTMLElement) => {
    mounted.set(true)
    return {
      destroy() {
        mounted.set(false)
      }
    }
  }

  return {
    action,
    mounted
  }
}
