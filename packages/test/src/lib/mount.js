/**
 * Component mounting core for Svelte 5.
 */
/** @typedef {{ [key: string]: any }} Props */

import * as Svelte from 'svelte'

import { addCleanupTask, removeCleanupTask } from './cleanup.js'
import { createProps } from './props.svelte.js'

/**
 * Mount a component into the DOM.
 *
 * @param {*} Component
 * @param {*} options
 */
const mount = (Component, options) => {
  const [props, updateProps] = createProps(options.props)
  const component = Svelte.mount(Component, { ...options, props })

  /** Remove the component from the DOM. */
  const unmount = () => {
    Svelte.flushSync(() => Svelte.unmount(component))
    removeCleanupTask(unmount)
  }

  /**
   * Update the component's props.
   *
   * @param {Props} nextProps
   */
  const rerender = (nextProps) => {
    Svelte.flushSync(() => updateProps(nextProps))
  }

  addCleanupTask(unmount)
  Svelte.flushSync()

  return { component, unmount, rerender }
}

export { mount }
