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

  /**
   * ResizeObserver fires after rAF, so trusting it alone would render one
   * frame stale during resize. To keep frames in sync without paying a
   * per-frame layout flush in steady state, the observer (and the synchronous
   * window resize event) opens a short resize-phase window during which
   * shouldUpdateSize re-reads layout at rAF time. Outside that window it
   * returns immediately.
   *
   * The window.resize listener is critical for window-driven resizes: it fires
   * *before* the affected rAF tick, so the gate is already open by the time
   * shouldUpdateSize runs that same frame — renderer.setSize() commits with
   * the new size before paint, avoiding a black flash. The ResizeObserver
   * handles container-driven resizes (sibling layout, theme toggle); those
   * get one frame of paint-stale dimensions but no visible flash since they
   * aren't tied to a fast user drag.
   */
  let inResizePhase = false
  let resizePhaseTimer: ReturnType<typeof setTimeout> | undefined

  const enterResizePhase = () => {
    inResizePhase = true
    if (resizePhaseTimer !== undefined) clearTimeout(resizePhaseTimer)
    resizePhaseTimer = setTimeout(() => {
      inResizePhase = false
      resizePhaseTimer = undefined
    }, 250)
  }

  const onWindowResize = () => {
    enterResizePhase()
  }

  const observer = new ResizeObserver(() => {
    dirty = true
    enterResizePhase()

    /**
     * Stamp size eagerly so consumers reading size.current outside rAF
     * (event handlers, async work) see fresh dimensions.
     */
    const rect = element.getBoundingClientRect()
    size = { width: rect.width, height: rect.height }
  })

  function shouldUpdateSize() {
    if (!dirty && !inResizePhase) return false

    /**
     * clientWidth/Height is integer-rounded but cheap; gate the precise,
     * transform-aware getBoundingClientRect read behind it. The dirty flag
     * forces the precise read after the observer fires, catching subpixel
     * changes that integer-rounded clientWidth/Height misses.
     */
    const { clientWidth, clientHeight } = element
    if (!dirty && clientWidth === lastClientWidth && clientHeight === lastClientHeight) {
      return false
    }

    lastClientWidth = clientWidth
    lastClientHeight = clientHeight
    dirty = false

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
    window.addEventListener('resize', onWindowResize, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onWindowResize)
      if (resizePhaseTimer !== undefined) clearTimeout(resizePhaseTimer)
    }
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
