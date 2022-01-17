import { browser } from '$app/env'
import type {
	ThrelteContext,
	ThrelteFrameHandler,
	ThrelteRenderContext,
	ThrelteUseFrame,
	ThrelteUseFrameOptions
} from '../types/types'
import { getContext, onDestroy } from 'svelte'

export const useFrame = (
	fn: (ctx: ThrelteContext, delta: number) => void,
	options?: ThrelteUseFrameOptions
): ThrelteUseFrame => {
	if (!browser) {
		return {
			start: () => undefined,
			stop: () => undefined
		}
	}

	const renderCtx = getContext<ThrelteRenderContext>('threlte-render-context')

	const handler: ThrelteFrameHandler = {
		fn,
		order: options?.order
	}

	const stop = () => {
		renderCtx.frameHandlers.delete(handler)
	}

	const start = () => {
		renderCtx.frameHandlers.add(handler)
	}

	if (options?.autostart ?? true) {
		start()
	}

	onDestroy(() => {
		renderCtx.frameHandlers.delete(handler)
	})

	return {
		start,
		stop
	}
}
