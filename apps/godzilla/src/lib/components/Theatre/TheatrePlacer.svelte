<script lang="ts">
	import { SheetObject } from '@threlte/theatre'
	import KeyboardControls from './KeyboardControls.svelte'
	import { T } from '@threlte/core'

	export let key: string
</script>

<SheetObject {key} let:Transform let:select let:deselect>
	<KeyboardControls let:transform>
		<Transform {...transform}>
			<T.Group
				on:click={(e) => {
					e.stopPropagation()
					select()
				}}
				on:pointermissed={deselect}
			>
				<slot />
			</T.Group>
		</Transform>
	</KeyboardControls>
</SheetObject>
