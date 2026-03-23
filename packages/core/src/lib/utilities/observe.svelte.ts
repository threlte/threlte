import { untrack } from 'svelte'
import { fromStore, type Readable } from 'svelte/store'

const signal = Symbol()
const isStore = (dep: unknown): dep is Readable<any> => {
  return typeof (dep as any)?.subscribe === 'function'
}

type Dependency = Readable<any> | any

type Dependencies = [Dependency, ...Array<Dependency>]

type ExtractReadableType<T> = T extends Readable<infer U> ? U : T

type CallbackArgs<D extends Dependencies> = { [K in keyof D]: ExtractReadableType<D[K]> }

type Callback<D extends Dependencies> = (deps: CallbackArgs<D>) => void | (() => void)

const runObserve = <Deps extends Dependencies>(
  dependencies: () => Deps,
  callback: Callback<Deps>,
  pre: boolean
) => {
  const stores = dependencies().map((d) => {
    if (isStore(d)) {
      return fromStore(d)
    }
    return signal
  })

  const deps = $derived(
    dependencies().map((d, i) => {
      if (stores[i] === signal) return d
      return (stores[i] as { current: any }).current
    })
  )

  const effect = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    deps
    let cleanup: void | (() => void) = undefined
    untrack(() => {
      cleanup = callback(deps as CallbackArgs<Deps>)
    })
    return cleanup
  }

  if (pre) {
    $effect.pre(effect)
  } else {
    $effect(effect)
  }
}

/**
 * ### `observe`
 *
 * Observe multiple stores and reactive values and call a callback when they
 * change to trigger side effects. The callback can return a cleanup function
 * that will be called when the dependencies change again or when the effect
 * root (most likely a component) is destroyed. Under the hood, `observe` uses
 * Svelte's `$effect` to track dependencies and trigger the callback. For a
 * version that uses `$effect.pre`, use `observe.pre`.
 *
 * ```ts
 * const count = writable(0)
 * let name = $state('John')
 *
 * observe(() => [count, name], ([count, name]) => {
 *  console.log(count, name) // 0 John
 * })
 * ```
 *
 * The callback can return a cleanup function that will be called when the
 * dependencies change again or when the component is destroyed.
 *
 * ```ts
 * const count = writable(0)
 *
 * observe(() => [count], ([count]) => {
 *  console.log(count) // 0
 *  return () => {
 *    console.log('cleanup')
 *  }
 * })
 * ```
 *
 * @param dependencies - A function that returns an array of dependencies.
 * @param callback - A function that will be called with the current values of
 * the dependencies. The callback can return a cleanup function that will be
 * called when the dependencies change again or when the component is destroyed.
 */
const observePost = <Deps extends Dependencies>(
  dependencies: () => Deps,
  callback: Callback<Deps>
) => {
  return runObserve(dependencies, callback, false)
}

/**
 * ### `observe.pre`
 *
 * Observe multiple stores and reactive values and call a callback when they
 * change to trigger side effects. The callback can return a cleanup function
 * that will be called when the dependencies change again or when the effect
 * root (most likely a component) is destroyed. Under the hood, `observe.pre` uses
 * Svelte's `$effect` to track dependencies and trigger the callback. For a
 * version that uses `$effect`, use `observe`.
 *
 * ```ts
 * const count = writable(0)
 * let name = $state('John')
 *
 * observe.pre(() => [count, name], ([count, name]) => {
 *  console.log(count, name) // 0 John
 * })
 * ```
 *
 * The callback can return a cleanup function that will be called when the
 * dependencies change again or when the component is destroyed.
 *
 * ```ts
 * const count = writable(0)
 *
 * observe.pre(() => [count], ([count]) => {
 *  console.log(count) // 0
 *  return () => {
 *    console.log('cleanup')
 *  }
 * })
 * ```
 *
 * @param dependencies - A function that returns an array of dependencies.
 * @param callback - A function that will be called with the current values of
 * the dependencies. The callback can return a cleanup function that will be
 * called when the dependencies change again or when the component is destroyed.
 */
const observePre = <Deps extends Dependencies>(
  dependencies: () => Deps,
  callback: Callback<Deps>
) => {
  return runObserve(dependencies, callback, true)
}

export const observe = Object.assign(observePost, { pre: observePre })
