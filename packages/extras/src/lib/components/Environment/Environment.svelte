<script lang="ts">
	import type { EnvironmentProperties } from '$lib/types/components'
	import { useThrelte } from '@threlte/core'
	import { onDestroy } from 'svelte'
	import {
		CubeTextureLoader,
		DefaultLoadingManager,
		LinearEncoding,
		PMREMGenerator,
		sRGBEncoding,
		Texture,
		TextureLoader
	} from 'three'
	import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader'
	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
	
	// import { GroundProjectedEnv } from 'three/examples/jsm/objects/GroundProjectedEnv'

	export let path: EnvironmentProperties['path'] = undefined
	export let files: EnvironmentProperties['files']
	export let isBackground: EnvironmentProperties['isBackground'] = undefined
	export let groundProjection: EnvironmentProperties['groundProjection'] = undefined
	export let format: EnvironmentProperties['format'] = 'ldr'
	export let encoding: EnvironmentProperties['encoding'] = undefined

	const { scene, invalidate, renderer } = useThrelte()

	$: isCubeMap = Array.isArray(files)
	$: envPath = `${path || ''}${files}`

	let previousEnvPath: string = ``
	let currentProcessedEnv: Texture
	let currentEnvMap: Texture
	let currentFormat = ''
	let currentGroundEnv: any

	const pickLoader = () => {
		if (isCubeMap && format == 'ldr') return new CubeTextureLoader()
		if (!isCubeMap && format == 'ldr') return new TextureLoader()
		if (isCubeMap && format == 'hdr') return new HDRCubeTextureLoader()
		if (!isCubeMap && format == 'hdr') return new RGBELoader()
		return new TextureLoader()
	}

	const loadEnvironment = () => {
		if (!renderer) throw new Error('Threlte renderer undefined')
		const pmremGenerator = new PMREMGenerator(renderer)
		DefaultLoadingManager.onLoad = function () {
			pmremGenerator.dispose()
		}
		const loader: any = pickLoader()

		if (isCubeMap) {
			pmremGenerator.compileCubemapShader()
			loader.setPath(path || '').load(files, (texture: any) => {
				currentEnvMap = texture
				texture.encoding = encoding || sRGBEncoding
				currentProcessedEnv = pmremGenerator.fromCubemap(texture).texture
				setEnvironment()
			})
		} else {
			pmremGenerator.compileEquirectangularShader()
			loader.load(`${path || ''}${files}`, (texture: any) => {
				currentEnvMap = texture
				texture.encoding = encoding || LinearEncoding
				currentProcessedEnv = pmremGenerator.fromEquirectangular(texture).texture
				setEnvironment()
			})
		}
		currentFormat = format
	}

	const setEnvironment = () => {
		scene.environment = currentProcessedEnv
		if (isBackground) scene.background = currentProcessedEnv
		invalidate()
	}

	// const toggleGroundEnv = (
	// 	groundEnv: GroundProjectedEnv | undefined,
	// 	groundEnvProps: EnvironmentProperties['groundProjection'],
	// 	envMap: Texture
	// ) => {
	// 	if (groundEnv && !groundEnvProps) {
	// 		scene.remove(currentGroundEnv)
	// 		currentGroundEnv = undefined
	// 		invalidate('Removing ground projected environment')
	// 	}
	// 	if (!groundEnv && groundEnvProps && envMap) {
	// 		currentGroundEnv = new GroundProjectedEnv(envMap)
	// 		currentGroundEnv.scale.setScalar(groundEnvProps.scalar)
	// 		currentGroundEnv.radius = groundEnvProps.radius
	// 		currentGroundEnv.height = groundEnvProps.height
	// 		scene.add(currentGroundEnv)
	// 		invalidate('Enabling ground projected environment')
	// 	}
	// 	if (groundEnv && groundEnvProps) {
	// 		currentGroundEnv.radius = groundEnvProps.radius
	// 		currentGroundEnv.height = groundEnvProps.height
	// 		invalidate('Updating ground projected environment properties')
	// 	}
	// }

	// $: toggleGroundEnv(currentGroundEnv, groundProjection, currentEnvMap)

	$: {
		// Reload environment on path change
		if (envPath != previousEnvPath || format != currentFormat) {
			if (currentProcessedEnv) {
				currentProcessedEnv.dispose()
			}
			loadEnvironment()
			previousEnvPath = envPath
		}

		if (!isBackground && scene.background) {
			scene.background = null
			invalidate('Removing Environment as scene.background')
		}
		if (isBackground && !scene.background && currentProcessedEnv) {
			scene.background = currentProcessedEnv
			invalidate('Adding Environment as scene.background')
		}
	}

	onDestroy(() => {
		scene.environment = null
		scene.background = null
		if (currentProcessedEnv) currentProcessedEnv.dispose()
		groundProjection = undefined
		invalidate('Environment destroyed')
	})
</script>
