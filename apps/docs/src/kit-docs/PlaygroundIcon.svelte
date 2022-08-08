<script lang="ts">
	export let href: string
	export let iconWidth = 28
	export let iconHeight = 28
	let __class = ''
	export { __class as class }
</script>

<a
	class={[
		'relative flex items-center text-gray-soft hover:text-gray-inverse border-0 rounded-md p-2 fill-current',
		__class
	].join(' ')}
	{href}
>
	<svg
		width={iconWidth}
		height={iconHeight}
		class={[$$slots.default && 'mr-2'].join(' ')}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		><path fill="none" d="M0 0h24v24H0z" /><path
			d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM10.622 8.415a.4.4 0 0 0-.622.332v6.506a.4.4 0 0 0 .622.332l4.879-3.252a.4.4 0 0 0 0-.666l-4.88-3.252z"
		/></svg
	>

	<span class="sr-only">Playground</span>
	<slot />
</a>
