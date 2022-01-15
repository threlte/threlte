<script context="module" lang="ts">
	import { browser } from '$app/env'
	import { onDestroy, onMount, setContext } from 'svelte'
	import {
		ACESFilmicToneMapping,
		Camera,
		Clock,
		LinearEncoding,
		NoToneMapping,
		Object3D,
		PCFSoftShadowMap,
		Scene,
		ShadowMapType,
		sRGBEncoding,
		Vector2,
		WebGLRenderer
	} from 'three'
	import { EffectComposer, Pass, RenderPass } from 'three-stdlib'
	import { useRaf } from './hooks/useRaf'
	import { useResize, UseResizeOptions } from './hooks/useResize'
	import HierarchicalObject from './internal/HierarchicalObject.svelte'
	import { animationFrameRaycast, eventRaycast, transformEvent } from './lib/interactivity'
	import type { ThrelteContext, ThrelteRootContext } from './lib/types'

	const requestRenderInstances: Set<() => void> = new Set()
	export const requestRender = () => {
		requestRenderInstances.forEach((fn) => fn())
	}
</script>

<script lang="ts">
	export let dpr: typeof devicePixelRatio = browser ? window.devicePixelRatio : 1
	export let flat: boolean = false
	export let linear: boolean = false
	export let frameloop: 'always' | 'demand' = 'demand'
	export let shadows = true
	export let shadowMapType: ShadowMapType = PCFSoftShadowMap
	export let resizeOpts: UseResizeOptions | undefined = undefined

	let canvas: HTMLCanvasElement | undefined
	let mounted = false
	let renderRequested = true
	let pointerOverCanvas = false

	const render = () => {
		renderRequested = true
	}
	requestRenderInstances.add(render)
	onDestroy(() => {
		requestRenderInstances.delete(render)
	})

	export const ctx: ThrelteContext = {
		size: { width: 0, height: 0 },
		pointer: undefined,
		clock: new Clock(),
		renderer: undefined,
		camera: undefined,
		scene: new Scene(),
		render
	}

	const addPass = (pass: Pass) => {
		if (!rootCtx.composer) return
		rootCtx.composer.addPass(pass)
		render()
	}

	const removePass = (pass: Pass) => {
		if (!rootCtx.composer) return
		rootCtx.composer.removePass(pass)
		render()
	}

	const setCamera = (camera: Camera) => {
		if (!rootCtx.composer) return
		ctx.camera = camera
		rootCtx.composer.passes.forEach((pass) => {
			if (pass instanceof RenderPass) {
				pass.camera = camera
			}
		})
		render()
	}

	export const rootCtx: ThrelteRootContext = {
		setCamera,
		addRaycastableObject: (object: Object3D) => rootCtx.raycastableObjects.add(object),
		removeRaycastableObject: (object: Object3D) => rootCtx.raycastableObjects.delete(object),
		addInteractiveObject: (object: Object3D) => rootCtx.interactiveObjects.add(object),
		removeInteractiveObject: (object: Object3D) => rootCtx.interactiveObjects.delete(object),
		addPass,
		removePass,
		linear,
		composer: undefined,
		interactiveObjects: new Set(),
		raycastableObjects: new Set(),
		resizeOpts
	}

	$: if (ctx.renderer) ctx.renderer.setPixelRatio(dpr)
	$: if (ctx.renderer) ctx.renderer.toneMapping = flat ? NoToneMapping : ACESFilmicToneMapping
	$: if (ctx.renderer) ctx.renderer.outputEncoding = linear ? LinearEncoding : sRGBEncoding
	$: rootCtx.linear = linear

	setContext<ThrelteContext>('threlte', ctx)

	setContext<ThrelteRootContext>('threlte-root', rootCtx)

	const resizeCanvas = () => {
		if (!canvas || !ctx.renderer || !rootCtx.composer) return
		const parentEl = ctx.renderer.domElement.parentElement
		if (parentEl) {
			ctx.size.width = parentEl.clientWidth
			ctx.size.height = parentEl.clientHeight
			ctx.renderer.setSize(ctx.size.width, ctx.size.height)
			rootCtx.composer.setSize(ctx.size.width, ctx.size.height)
		}
	}

	useResize(resizeCanvas, resizeOpts)

	onMount(() => {
		if (!canvas) return
		ctx.renderer = new WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance'
		})
		ctx.renderer.toneMapping = flat ? NoToneMapping : ACESFilmicToneMapping
		ctx.renderer.outputEncoding = linear ? LinearEncoding : sRGBEncoding
		ctx.renderer.shadowMap.enabled = shadows
		ctx.renderer.shadowMap.type = shadowMapType

		rootCtx.composer = new EffectComposer(ctx.renderer)
		rootCtx.composer.addPass(new RenderPass(ctx.scene, ctx.camera ?? new Camera()))

		resizeCanvas()
		ctx.renderer.setPixelRatio(dpr)
		rootCtx.composer.setPixelRatio(dpr)
		mounted = true
	})

	const onEvent = (e: MouseEvent | PointerEvent) => {
		pointerOverCanvas = true
		if (!ctx.pointer) ctx.pointer = new Vector2()
		transformEvent(ctx.pointer, e, ctx)
		eventRaycast(ctx, rootCtx, e)
	}

	useRaf(() => {
		if (rootCtx.interactiveObjects.size === 0 && frameloop === 'demand' && !renderRequested) return
		if (!ctx.camera || !rootCtx.composer || !ctx.renderer) return

		animationFrameRaycast(ctx, rootCtx, pointerOverCanvas)

		if (rootCtx.composer.passes.length > 1) {
			rootCtx.composer.render()
		} else {
			ctx.renderer.render(ctx.scene, ctx.camera)
		}

		renderRequested = false
	})
</script>

<canvas
	bind:this={canvas}
	on:click={onEvent}
	on:contextmenu={onEvent}
	on:pointerup={onEvent}
	on:pointerdown={onEvent}
	on:pointermove={onEvent}
	on:pointerenter={() => (pointerOverCanvas = true)}
	on:pointerleave={() => (pointerOverCanvas = false)}
>
	{#if mounted}
		<HierarchicalObject object={ctx.scene}>
			<slot />
		</HierarchicalObject>
	{/if}
</canvas>

<style>
	canvas {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
</style>
