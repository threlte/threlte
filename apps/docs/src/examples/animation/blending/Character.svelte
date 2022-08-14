<script lang="ts">
	import { GLTF, useGltfAnimations } from '@threlte/extras'
	import { buttonIdle, buttonRun } from './state.svelte'

	let action: string

	const { gltf, actions, mixer } = useGltfAnimations(({ actions, mixer }) => {
		// set the initial animation
		action = 'idle'
		actions[action].play()

		// idle
		delete actions['walk']
		// run

		delete actions['agree']
		delete actions['headShake']
		delete actions['sad_pose']
		delete actions['sneak_pose']
	})

	const changeAnimation = (newAction: string, duration: number) => {
		console.log('changing animation to', newAction)
		for (const key in $actions) {
			const action = $actions[key]!
			console.log(key, action.getEffectiveWeight(), action.isRunning())
		}
		$actions[action].fadeOut(duration) //($actions[newAction], duration, true)
		$actions[newAction].fadeIn(duration)
		// $actions[newAction].play()
		// action = newAction
	}

	buttonIdle.add(() => {
		changeAnimation('idle', 1)
	})

	buttonRun.add(() => {
		changeAnimation('run', 1)
	})
</script>

<GLTF bind:gltf={$gltf} url="https://threejs.org/examples/models/gltf/Xbot.glb" />
