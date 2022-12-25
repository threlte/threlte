<script lang="ts">
	import { injectRootPlugin, useParent, useThrelte } from '@threlte/core'
	import { onDestroy } from 'svelte'
	import { Object3D } from 'three'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
	import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

	const parent = useParent()
	const { renderer, camera, scene } = useThrelte()
	const orbitControlsInstances = new Set<OrbitControls>()
	injectRootPlugin('transform-controls', ({ ref }) => {
		if (!(ref instanceof OrbitControls)) return
		orbitControlsInstances.add(ref)
		return {
			onDestroy: () => {
				orbitControlsInstances.delete(ref)
			}
		}
	})

	const tc = new TransformControls($camera, renderer?.domElement)
	if ($parent instanceof Object3D) tc.attach($parent)
	scene.add(tc)
	tc.addEventListener('mouseDown', () => {
		orbitControlsInstances.forEach((oc) => (oc.enabled = false))
	})
	tc.addEventListener('mouseUp', () => {
		orbitControlsInstances.forEach((oc) => (oc.enabled = true))
	})
	onDestroy(() => {
		if (tc) {
			tc.detach()
			tc.dispose()
		}
	})
</script>
