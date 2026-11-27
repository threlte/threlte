/** Set up the document to render a component. */
import { addCleanupTask } from './cleanup.js'

/** Allowed options for the Svelte 5 `mount` call. */
const ALLOWED_MOUNT_OPTIONS = [
  'target',
  'anchor',
  'props',
  'events',
  'context',
  'intro',
]

class UnknownSvelteOptionsError extends TypeError {
  /**
   * @param {string[]} unknownOptions
   */
  constructor(unknownOptions) {
    super(`Unknown options.

    Unknown: [ ${unknownOptions.join(', ')} ]
    Allowed: [ ${ALLOWED_MOUNT_OPTIONS.join(', ')} ]

    To pass both Svelte options and props to a component,
    or to use props that share a name with a Svelte option,
    you must place all your props under the \`props\` key:

    render(Component, { props: { /** props here **/ } })
`)
    this.name = 'UnknownSvelteOptionsError'
  }
}

/**
 * Validate a component's mount options.
 *
 * @param {*} options - props or mount options
 */
const validateOptions = (options) => {
  const isProps = !Object.keys(options).some((option) =>
    ALLOWED_MOUNT_OPTIONS.includes(option)
  )

  if (isProps) {
    return { props: options }
  }

  const unknownOptions = Object.keys(options).filter(
    (option) => !ALLOWED_MOUNT_OPTIONS.includes(option)
  )

  if (unknownOptions.length > 0) {
    throw new UnknownSvelteOptionsError(unknownOptions)
  }

  return options
}

/**
 * Set up the document to render a component.
 *
 * @param {*} componentOptions - props or mount options
 * @param {{
 *   baseElement?: HTMLElement
 *   canvas?: HTMLCanvasElement
 * }} setupOptions
 */
const setup = (componentOptions = {}, setupOptions = {}) => {
  const mountOptions = validateOptions(componentOptions)

  /** @type {HTMLElement} */
  const baseElement =
    setupOptions.baseElement ?? mountOptions.target ?? document.body

  const defaultTarget = document.createElement('div')
  defaultTarget.style = 'width:200px;height:200px'

  /** @type {HTMLElement} */
  const container =
    mountOptions.target ?? baseElement.appendChild(defaultTarget)

  /** @type {HTMLCanvasElement} */
  const canvas = setupOptions.canvas ?? document.createElement('canvas')
  container.append(canvas)

  addCleanupTask(() => {
    if (container.parentNode === document.body) {
      container.remove()
    }
  })

  return {
    baseElement,
    container,
    canvas,
    mountOptions: { ...mountOptions, target: container },
  }
}

export { setup, UnknownSvelteOptionsError }
