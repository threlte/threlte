<script lang="ts">
	import { Pass } from '@threlte/core'
	import { Vector2 } from 'three'
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
	import ArcadeMachineScene from './ArcadeMachineScene.svelte'
	import GameScene from './GameScene.svelte'

	const unrealBloomPass = new UnrealBloomPass(new Vector2(512, 512), 0.7, 1, 0.25)
</script>

<Pass pass={unrealBloomPass} />

<ArcadeMachineScene />

<GameScene />
