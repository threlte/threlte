import { writable, type Writable } from 'svelte/store'

export type AsyncWritable<T> = Writable<T | undefined> & {
  promise: Promise<T>
  then: Promise<T>['then']
  catch: Promise<T>['catch']
}

export const asyncWritable = <T>(promise: Promise<T>): AsyncWritable<T> => {
  const { subscribe, set, update } = writable<T>(undefined)

  promise
    .then((result) => {
      set(result)
    })
    .catch((error) => {
      console.error('Error in asyncWritable:', error.message)
    })

  return {
    subscribe,
    set,
    update,
    promise,
    then: promise.then.bind(promise),
    catch: promise.catch.bind(promise)
  }
}
