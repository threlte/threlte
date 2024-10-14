<script lang="ts">
	import { writable, type Writable } from 'svelte/store'

	import { Toast } from './toast'

	import { Fieldset } from './fields'

	export let action: string
	export let submitButton: string = 'submit'
	export let method: 'post' | 'get' = 'post'
	export let id: string = action

	let toast:
		| {
				type: 'error' | 'info'
				title: string
				message: string
		  }
		| undefined = undefined

	let open: Writable<boolean> = writable(false)

	let type: 'error' | 'info' = 'info'
	let title: string = ''
	let message: string = ''
</script>

<form {id} {method} on:submit>
	<slot />
	<Fieldset align="right">
		<button class="pl-4 orange-button">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="#ffffff"
				viewBox="0 0 256 256"
				><path
					d="M223.69,42.18l-58.22,192a8,8,0,0,1-14.92,1.25L110,149.81a8,8,0,0,0-3.8-3.8L20.58,105.45a8,8,0,0,1,1.25-14.92l192-58.22A8,8,0,0,1,223.69,42.18Z"
					opacity="0.2"
				></path><path
					d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.42,29.84l85.62,40.55,40.55,85.62A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14L118.42,148.9l47.24-47.25a8,8,0,0,0-11.31-11.31L107.1,137.58,24,98.22l.14,0L216,40Z"
				></path></svg
			>
			{submitButton}
		</button>
		<Toast bind:open={$open} {type} {title} {message} />
	</Fieldset>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0;
		z-index: 100;
		margin: 2em 0;
	}
</style>
