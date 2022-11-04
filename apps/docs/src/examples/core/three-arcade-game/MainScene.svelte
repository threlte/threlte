<script lang="ts">
	import { Pass } from '@threlte/core'
	import { onDestroy } from 'svelte'
	import { Vector2 } from 'three'
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
	import ArcadeMachineScene from './ArcadeMachineScene.svelte'
	import GameScene from './game/GameScene.svelte'
	import Intro from './game/Intro.svelte'
	import { blinkClock } from './game/state'

	const unrealBloomPass = new UnrealBloomPass(new Vector2(512, 512), 0.7, 1, 0.25)

	const intervalHandler = setInterval(() => {
		blinkClock.update((c) => (c === 0 ? 1 : 0))
	}, 96)
	onDestroy(() => {
		clearInterval(intervalHandler)
	})
</script>

<Pass pass={unrealBloomPass} />

<ArcadeMachineScene />

<GameScene />
