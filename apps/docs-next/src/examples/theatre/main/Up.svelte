<script lang="ts">
	import { writable } from 'svelte/store'

	export let value: any = undefined

	const writableValue = writable(value)
	$: value = $writableValue
</script>

<slot value={writableValue} />
