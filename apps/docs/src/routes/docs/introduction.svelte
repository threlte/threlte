<!--
	@component

	This was the initial route for threlte for a long time.
	Redirecting to new route.
-->
<script lang="ts" context="module">
	export const load = () => {
		return {
			redirect: '/',
			status: 301
		}
	}
</script>
