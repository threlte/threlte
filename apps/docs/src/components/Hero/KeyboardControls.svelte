<script lang="ts">
	import { DEG2RAD } from 'three/src/math/MathUtils'

	export let translationSnap = 1
	export let rotationSnap = 15 * DEG2RAD
	export let scaleSnap = 0.1

	let useSnap = false
	let mode: 'translate' | 'rotate' | 'scale' = 'translate'
	let space: 'world' | 'local' = 'local'

	const onKeyDown = (e: KeyboardEvent) => {
		// toggle snap on Shift
		if (e.key === 'Shift') {
			useSnap = true
		}
	}

	const onKeyUp = (e: KeyboardEvent) => {
		if (e.key === 'Shift') {
			useSnap = false
		}
	}

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key === 't') mode = 'translate'
		if (e.key === 'r') mode = 'rotate'
		if (e.key === 's') mode = 'scale'
		if (e.key === 'g') {
			if (space === 'world') {
				space = 'local'
			} else {
				space = 'world'
			}
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} on:keypress={onKeyPress} />

<slot
	transform={{
		translationSnap: useSnap ? translationSnap : undefined,
		rotationSnap: useSnap ? rotationSnap : undefined,
		scaleSnap: useSnap ? scaleSnap : undefined,
		mode,
		space
	}}
/>
