<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Environment } from '@threlte/extras'
	import Scene from './Scene.svelte'
	import { useTweakpane } from '../../utils/useTweakpane'

	const { pane, action, addInput } = useTweakpane({
		title: 'Environment'
	})

	const coreFolder = pane.addFolder({
		title: 'core'
	})

	const groundProjectionFolder = pane.addFolder({
		title: 'Ground Projection'
	})

	const isBackground = addInput({
		label: 'isBackground',
		value: true,
		parent: coreFolder
	})

	let path = '/hdr/'
	let files: string | string[] = 'shanghai_riverside_1k.hdr'

	addInput({
		label: 'scene',
		value: 'cube_ldr',
		parent: groundProjectionFolder,
		params: {
			options: {
				cube_ldr: 'cube_ldr',
				cube_hdr: 'cube_hdr',
				equirect_ldr: 'equirect_ldr',
				equirect_hdr: 'equirect_hdr'
			}
		}
	}).subscribe((v) => {
		switch (v) {
			case 'cube_ldr':
				path = '/hdr/Bridge2_cube/'
				files = ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']
				break
			case 'cube_hdr':
				path = '/hdr/pisaHDR/'
				files = ['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr']
				break
			case 'equirect_ldr':
				path = '/hdr/'
				files = 'equirect_ruined_room.jpg'
				break
			case 'equirect_hdr':
				path = '/hdr/'
				files = 'shanghai_riverside_1k.hdr'
				break
			default:
				console.log(`Sorry, we are out of.`)
		}
	})

	const ground = addInput({
		label: 'Use ground environment',
		value: true,
		params: {},
		parent: groundProjectionFolder
	})
	const scale = addInput({
		label: 'Scale',
		value: { x: 100, y: 100, z: 100 },
		parent: groundProjectionFolder
	})
	const radius = addInput({
		label: 'radius',
		value: 100,
		params: { min: 10, max: 300 },
		parent: groundProjectionFolder
	})
	const height = addInput({
		label: 'height',
		value: 5,
		params: { min: 1, max: 50 },
		parent: groundProjectionFolder
	})
</script>

<div use:action />

<Canvas>
	<Environment
		{path}
		{files}
		isBackground={$isBackground}
		groundProjection={$ground ? { radius: $radius, height: $height, scale: $scale } : undefined}
	/>
	<Scene />
</Canvas>
