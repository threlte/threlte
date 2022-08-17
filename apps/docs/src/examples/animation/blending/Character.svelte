<script lang="ts">
	import { onDestroy } from 'svelte'
	import { GLTF, useGltfAnimations } from '@threlte/extras'
	import { buttonIdle, buttonWalk, buttonRun } from './state.svelte'

	let currentActionKey = 'idle'

	const { gltf, actions } = useGltfAnimations(({ actions }) => {
		// Uncomment to see all the different possible action keys
		// console.log(actions);
		// set the initial animation
		actions[currentActionKey].play()
	})

	const unsub1 = buttonIdle.subscribe(() => {
		console.log("transition to idle");
		transitionTo('idle', 1)
	})

	const unsub2 = buttonWalk.subscribe(() => {
		console.log("transition to run");
		transitionTo('walk', 1)
	})

	const unsub3 = buttonRun.subscribe(() => {
		console.log("transition to run");
		transitionTo('run', 1)
	})

	function transitionTo(nextActionKey:string, duration = 1) {
		const currentAction = $actions[currentActionKey]
		const nextAction = $actions[nextActionKey]
		if (currentAction === nextAction) return
		// Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
		nextAction.enabled = true

		if (currentAction) {
			currentAction.crossFadeTo(nextAction, duration, true)
		}

		// Not sure why I need this but the source code does not
		nextAction.play()
		currentActionKey = nextActionKey
	}

	function handleKeyDown(event:KeyboardEvent) {
		switch (event.key) {
			case "a":
				transitionTo('idle', 0.2)
				break;
			case "s":
				transitionTo('walk', 0.2)
				break;
			case "d":
				transitionTo('run', 0.2)
				break;
			default:
				break;
		}
	}

	function handleKeyUp() {
		transitionTo('idle', 0.2)
	}

	onDestroy(() => {
		// We unsubscribe otherwise we'd have old subscriptions still active
		unsub1()
		unsub2()
		unsub3()
	})
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp}/>

<GLTF bind:gltf={$gltf} url="https://threejs.org/examples/models/gltf/Xbot.glb" />
