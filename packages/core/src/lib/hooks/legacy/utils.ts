import { getContext, setContext } from 'svelte'

export const orderToKey = (order: number) => `useFrame-order-${order.toString()}`

type LegacyFrameCompatibilityContext = {
  useFrameOrders: number[]
  useRenderOrders: number[]
}

const useLegacyFrameCompatibilityContextKey = Symbol('use-legacy-frame-compatibility-context')

export const injectLegacyFrameCompatibilityContext = () => {
  const ctx: LegacyFrameCompatibilityContext = {
    useFrameOrders: [],
    useRenderOrders: []
  }
  setContext(useLegacyFrameCompatibilityContextKey, ctx)

  return ctx
}

export const useLegacyFrameCompatibilityContext = () => {
  const ctx = getContext<LegacyFrameCompatibilityContext>(useLegacyFrameCompatibilityContextKey)

  if (ctx === undefined) {
    throw new Error(
      'No legacy frame compatibility context found, are you using this hook inside of <Canvas>?'
    )
  }

  return ctx
}
