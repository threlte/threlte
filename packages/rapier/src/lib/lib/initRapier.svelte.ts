import RAPIER from '@dimforge/rapier3d-compat'

let initialized = false
let promise: Promise<void> | undefined

export const initRapier = () => {
  if (initialized) return true
  if (!promise) {
    promise = new Promise<void>((resolve) => {
      RAPIER.init().then(() => {
        initialized = true
        resolve()
      })
    })
  }
  return promise
}
