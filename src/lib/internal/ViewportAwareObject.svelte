<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte'
	import type { Object3D } from 'three'
	import { Frustum, Matrix4 } from 'three'
	import { useFrame } from 'threlte/lib/useFrame'
	import { useThrelte } from 'threlte/lib/useThrelte'

	export let object: Object3D

	const dispatch = createEventDispatcher<{
		viewportenter: undefined
		viewportleave: undefined
	}>()

	const frustum = new Frustum()
	const projScreenMatrix = new Matrix4()

	const ctx = useThrelte()

	const checkVisibility = (): boolean => {
		if (!ctx.camera) return true
		projScreenMatrix.multiplyMatrices(ctx.camera.projectionMatrix, ctx.camera.matrixWorldInverse)
		frustum.setFromProjectionMatrix(projScreenMatrix)
		return frustum.intersectsObject(object)
	}

	let ticked = false

	export let inViewport: boolean | undefined = undefined

	const dispatchEvent = async (isInViewport: boolean) => {
		if (isInViewport) {
			if (!ticked) await tick()
			dispatch('viewportenter')
		} else {
			if (!ticked) await tick()
			dispatch('viewportleave')
		}
	}

	ctx.render()

	useFrame(() => {
		const v = checkVisibility()
		if (inViewport === undefined) {
			inViewport = checkVisibility()
			dispatchEvent(inViewport)
		} else if (v !== inViewport) {
			dispatchEvent(v)
			inViewport = v
		}
	})

	const init = async () => {
		await tick()
		ticked = true
	}

	init()
</script>
