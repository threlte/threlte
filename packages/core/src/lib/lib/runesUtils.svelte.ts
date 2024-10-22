import { untrack } from 'svelte'

const runObserve = <Deps extends () => [any, ...Array<any>] | Array<any>>(
  dependencies: Deps,
  handler: (dependencies: ReturnType<Deps>) => void | (() => void),
  pre: boolean
) => {
  const effect = () => {
    const deps = dependencies()
    let cleanup: void | (() => void) = undefined
    untrack(() => {
      cleanup = handler(deps as ReturnType<Deps>)
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
 * `observe` is a utility function that creates an $effect with explicit
 * dependencies. It's the runes equivalent of Threlte's `watch`.
 *
 * @param {Deps} dependencies - A function that returns the dependencies to
 * observe.
 * @param {function} handler - A function that is called with the dependencies.
 * It can optionally return a cleanup function. The function is called initially
 * and when the dependencies change. The cleanup function is called when the
 * dependencies change right before the next call to the handler and when the
 * effect is stopped.
 *
 * @example
 * ```ts
 * observe(
 *   () => [dependency1, dependency2],
 *   ([dep1, dep2]) => {
 *     // Do something with dep1 and dep2, other
 *     // dependencies used here are not tracked.
 *     return () => {
 *       // Cleanup code
 *     }
 *   }
 * )
 * ```
 */
const observePost = <Deps extends () => [any, ...Array<any>]>(
  dependencies: Deps,
  handler: (dependencies: ReturnType<Deps>) => void | (() => void)
) => {
  return runObserve(dependencies, handler, false)
}

/**
 * ### `observe.pre`
 *
 * `observe.pre` is a utility function that creates an $effect.pre with explicit
 * dependencies. It's the runes equivalent of Threlte's `watch`.
 *
 * @param {Deps} dependencies - A function that returns the dependencies to
 * observe.
 * @param {function} handler - A function that is called with the dependencies.
 * It can optionally return a cleanup function. The function is called initially
 * and when the dependencies change. The cleanup function is called when the
 * dependencies change right before the next call to the handler and when the
 * effect is stopped.
 *
 * @example
 * ```ts
 * observe.pre(
 *   () => [dependency1, dependency2],
 *   ([dep1, dep2]) => {
 *     // Do something with dep1 and dep2, other
 *     // dependencies used here are not tracked.
 *     return () => {
 *       // Cleanup code
 *     }
 *   }
 * )
 * ```
 */
const observePre = <Deps extends () => [any, ...Array<any>]>(
  dependencies: Deps,
  handler: (dependencies: ReturnType<Deps>) => void | (() => void)
) => {
  return runObserve(dependencies, handler, true)
}

export const observe = Object.assign(observePost, { pre: observePre })
