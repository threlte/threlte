<script lang="ts">
	import { scrollPos } from './scrollPos'

	let _in: number | false = 0
	let _out: number | false | undefined = 1

	export { _in as in }
	export { _out as out }

	$: inC = _in === false ? -Infinity : _in
	$: outC = _out === false ? Infinity : _out === undefined ? 0 : _out
</script>

{#if $scrollPos > inC && (_out !== undefined || $scrollPos < outC)}
	<slot />
{:else}
	<slot name="fallback" />
{/if}
