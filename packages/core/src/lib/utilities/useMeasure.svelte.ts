/**
 * Tracks the rendered dimensions of an element using `ResizeObserver` and
 * `getBoundingClientRect`. Returns a reactive object whose `width` and
 * `height` always reflect the latest measured size.
 *
 * `getBoundingClientRect` is used (rather than `clientWidth/clientHeight` or
 * `ResizeObserver.contentRect`) because it accounts for CSS transforms on the
 * element and matches what most browser measurement code expects.
 *
 * ```ts
 * const measure = useMeasure(element)
 *
 * $effect(() => {
 *   console.log(measure.width, measure.height)
 * })
 * ```
 */
export const useMeasure = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()

  let size = $state.raw({ width: rect.width, height: rect.height })

  let lastClientHeight = 0
  let lastClientWidth = 0
  let lastRectWidth = 0
  let lastRectHeight = 0
  let dirty = true

  const observer = new ResizeObserver(() => {
    dirty = true
    const rect = element.getBoundingClientRect()
    size = { width: rect.width, height: rect.height }
  })

  function shouldUpdateSize() {
    const { clientWidth, clientHeight } = element

    // super cheap check every frame
    if (!dirty && clientWidth === lastClientWidth && clientHeight === lastClientHeight) {
      return false
    }

    lastClientWidth = clientWidth
    lastClientHeight = clientHeight
    dirty = false

    // expensive read only when something likely changed
    const rect = element.getBoundingClientRect()
    size = { width: rect.width, height: rect.height }

    if (size.width === lastRectWidth && size.height === lastRectHeight) {
      return false
    }

    lastRectWidth = size.width
    lastRectHeight = size.height

    return true
  }

  $effect(() => {
    observer.observe(element)
    return () => observer.disconnect()
  })

  return {
    size: {
      get current() {
        return size
      }
    },
    shouldUpdateSize
  }
}
