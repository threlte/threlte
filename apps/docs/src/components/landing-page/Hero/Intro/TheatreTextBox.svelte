<script lang="ts">
	import { createSheetObjectAction } from '@threlte/theatre'
	import Reveal from '../Reveal.svelte'
	import FadeOut from '../FadeOut.svelte'

	const sheetObject = createSheetObjectAction()

	export let key: string
	let reveal = 0
	let fade = 0
</script>

<div
	{...$$restProps}
	use:sheetObject={{
		key,
		props: {
			opacity: 1,
			translateX: 0,
			translateY: 0,
			reveal: 0,
			fade: 0
		},
		callback(node, props) {
			node.style.opacity = props.opacity
			node.style.transform = `translate(${props.translateX}px, ${props.translateY}px)`
			reveal = props.reveal
			fade = props.fade
		}
	}}
>
	<Reveal progress={reveal}>
		<FadeOut progress={fade}>
			<slot />
		</FadeOut>
	</Reveal>
</div>
