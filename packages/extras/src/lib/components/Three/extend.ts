import { getContext, setContext } from 'svelte'
import * as THREE from 'three'

export const extend = (extensions: Record<string, any>) => {
  setContext('threlte-three-extensions', extensions)
}

export const useExtensions = () => {
  const extensions = getContext('threlte-three-extensions') as Record<string, any>
  return {
    ...THREE,
    ...extensions
  }
}
