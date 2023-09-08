import { derived } from 'svelte/store'
import { yoga } from '../stores/yoga'

export const useYoga = () => {
  const loaded = derived(yoga, (yoga) => yoga !== undefined)

  return {
    yoga,
    loaded
  }
}
