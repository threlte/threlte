<script context="module">
	class Signal {
		constructor() {
			this.funcs = []
		}
		add(fn) {
			// console.info(`${this.name} signal adding new function:`);
			// console.info(fn);
			this.funcs.push(fn)
		}
		dispatch(args) {
			// console.info(`${this.name} signal dispatching`);
			this.funcs.forEach((fn) => {
				fn(args)
			})
		}
	}

	export const buttonIdle = new Signal()
	export const buttonRun = new Signal()

	// onDestroy(() => {
	// 	console.log("destory");
	// })

	// onMount(() => {
	// 	console.log("mount");
	// })
</script>
