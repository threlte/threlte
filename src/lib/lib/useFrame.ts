import { browser } from '$app/env'
import { onDestroy } from 'svelte'
import type { ThrelteContext } from './types'
import { useThrelte } from './useThrelte'

type UseFrame = {
	stop: () => void
	start: () => void
}

type Handler = {
	fn: (ctx: ThrelteContext, delta: number) => void
	order?: number
}

type UseFrameOptions = {
	order?: number
	autostart?: boolean
}

const handlers: Set<Handler> = new Set()

const maybeStartHandlers = (ctx: ThrelteContext) => {
	if (handlers.size > 0) tick(ctx)
}

const tick = (ctx: ThrelteContext) => {
	if (handlers.size === 0) return
	const anyHasOrder = Array.from(handlers).reduce((acc, h) => (h.order ? true : acc), false)
	const delta = ctx.clock.getDelta()
	if (anyHasOrder) {
		Array.from(handlers)
			.sort((a, b) => ((a.order ?? 0) < (b.order ?? 0) ? 1 : -1))
			.forEach((h) => h.fn(ctx, delta))
	} else {
		handlers.forEach((h) => h.fn(ctx, delta))
	}
	ctx.render()
	requestAnimationFrame(tick.bind(this, ctx))
}

export const useFrame = (
	fn: (ctx: ThrelteContext, delta: number) => void,
	options?: UseFrameOptions
): UseFrame => {
	if (!browser) {
		return {
			start: () => undefined,
			stop: () => undefined
		}
	}

	const ctx = useThrelte()
	if (!ctx) {
		throw new Error(
			'Threlte context missing: useFrame must be called from components inside a <Canvas> component and on the root level only.'
		)
	}

	const handler: Handler = {
		fn,
		order: options?.order
	}

	const stop = () => {
		handlers.delete(handler)
	}

	const start = () => {
		handlers.add(handler)
		maybeStartHandlers(ctx)
	}

	onDestroy(() => {
		handlers.delete(handler)
	})

	if (options?.autostart ?? true) {
		start()
	}

	return {
		stop,
		start
	}
}
