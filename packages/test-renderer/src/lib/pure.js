import * as Svelte from 'svelte'
import * as THREE from 'three'

import { cleanup } from './cleanup.js'
import Container from './Container.svelte'
import { mount } from './mount.js'
import { setup } from './setup.js'

/**
 * @TODO export this from @threlte/extras
 * @typedef {'click' | 'contextmenu' | 'dblclick' | 'wheel' | 'pointerup' | 'pointerdown' | 'pointerover' | 'pointerout' | 'pointerenter' | 'pointerleave' | 'pointermove' | 'pointermissed'} ThrelteEvents
 */

/**
 * The rendered component and bound testing functions.
 *
 * @template {import('./component-types.js').Component} C
 * @template {import('@testing-library/dom').Queries} [Q=typeof import('@testing-library/dom').queries]
 *
 * @typedef {{
 *   container: HTMLElement
 *   baseElement: HTMLElement
 *   canvas: HTMLCanvasElement
 *   camera: import('@threlte/core').CurrentWritable<import('three').Camera>
 *   scene: import('three').Scene
 *   context: import('@threlte/core').ThrelteContext<import('three').WebGLRenderer>
 *   component: import('./component-types.js').Exports<C>
 *   fireEvent(object3D: import('three').Object3D, event: ThrelteEvents, payload?: import('@threlte/extras').IntersectionEvent<ThrelteEvents>): Promise<void>
 *   advance: (options?: { count?: number; delta?: number }) => ({ frameInvalidated: boolean })
 *   rerender: (props?: Partial<import('./component-types.js').Props<C>>) => Promise<void>
 *   unmount: () => void
 *   toCanvasPosition: (input: string | THREE.Object3D) => { x: number, y: number }
 * }} RenderResult
 */

/**
 * Get the canvas position of an Object3D.
 *
 * @param {THREE.Object3D | string} input
 * @param {THREE.Scene} scene
 * @param {HTMLElement} el
 * @param {THREE.Camera} camera
 * @returns {{ x: number; y: number }}
 */
function getObject3dCanvasPosition(input, scene, el, camera) {
  const object3D =
    typeof input === 'string' ? scene.getObjectByName(input) : input

  if (object3D === undefined) {
    throw new Error(`${input} not found in scene.`)
  }

  const vector = new THREE.Vector3()

  object3D.getWorldPosition(vector)
  vector.project(camera)

  const rect = el.getBoundingClientRect()
  const viewportX = rect.left + ((vector.x + 1) / 2) * rect.width
  const viewportY = rect.top + ((-vector.y + 1) / 2) * rect.height

  const position = {
    x: viewportX - rect.left,
    y: viewportY - rect.top,
  }

  return position
}

/**
 * Render a component into the document.
 *
 * @template {import('./component-types.js').Component} C
 * @template {import('@testing-library/dom').Queries} [Q=typeof import('@testing-library/dom').queries]
 *
 * @param {import('./component-types.js').ComponentType<C>} Component - The component to render.
 * @param {import('./component-types.js').Props<C> | Partial<import('./component-types.js').MountOptions<C>>} options - Customize how Svelte renders the component.
 * @param {{
 *   baseElement?: HTMLElement
 *   canvas?: HTMLCanvasElement
 *   context?: Record<string, any>
 *   delta?: number
 * }} renderOptions
 * @returns {RenderResult<C, Q>} The rendered component and bound testing functions.
 */
const render = (Component, options = {}, renderOptions = {}) => {
  const { baseElement, container, canvas, mountOptions } = setup(
    options,
    renderOptions
  )

  const { component, unmount, rerender } = mount(Container, {
    ...mountOptions,
    props: {
      canvas,
      container,
      component: 'default' in Component ? Component.default : Component,
      contextOptions: renderOptions.context,
      ...mountOptions.props,
    },
  })

  component.advance({ delta: renderOptions.delta ?? 0 })

  const handlers = component.interactivityContext.handlers

  return {
    baseElement,
    canvas,
    camera: component.context.camera,
    component: component.ref,
    container,
    toCanvasPosition: (input) =>
      getObject3dCanvasPosition(
        input,
        component.context.scene,
        component.context.dom,
        component.context.camera.current
      ),
    context: component.context,
    scene: component.context.scene,
    advance: component.advance,

    fireEvent: async (object3D, event, payload) => {
      const eventDispatcher = handlers.get(object3D)

      if (typeof eventDispatcher === 'function') {
        eventDispatcher(event, payload)
      } else {
        eventDispatcher[`on${event}`](payload)
      }

      await Svelte.tick()
    },

    rerender: async (props = {}) => {
      rerender(props)
      await Svelte.tick()
    },

    unmount,
  }
}

/**
 * Call a function and wait for Svelte to flush pending changes.
 *
 * @param {((() => Promise<void>) | (() => void))=} fn
 * @returns {Promise<void>}
 */
const act = async (fn) => {
  if (fn) {
    await fn()
  }
  return Svelte.tick()
}

export { act, cleanup, render }
