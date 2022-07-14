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
	target="_blank"
>
	<svg
		width={iconWidth}
		height={iconHeight}
		class={[$$slots.default && 'mr-2'].join(' ')}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<circle cx="12" cy="11.96" r="9.96" />
		<path fill="#fff" d="M6.87 17.09H12V9.4h2.57v7.69h2.56V6.83H6.87v10.26z" />
	</svg>

	<span class="sr-only">NPM</span>
	<slot />
</a>
