import Worker from '../workers/compiler/index.js?worker';

const workers = new Map();

let uid = 1;

export default class Compiler {
	constructor(svelteUrl) {
		if (!workers.has(svelteUrl)) {
			const worker = new Worker();
			worker.postMessage({ type: 'init', svelteUrl });
			workers.set(svelteUrl, worker);
		}

		this.worker = workers.get(svelteUrl);

		this.handlers = new Map();

		this.worker.addEventListener('message', (event) => {
			const handler = this.handlers.get(event.data.id);

			if (handler) {
				// if no handler, was meant for a different REPL
				handler(event.data.result);
				this.handlers.delete(event.data.id);
			}
		});
	}

	compile(component, options, return_ast) {
		return new Promise((fulfil) => {
			const id = uid++;

			this.handlers.set(id, fulfil);

			this.worker.postMessage({
				id,
				type: 'compile',
				source: component.source,
				options: Object.assign(
					{
						name: component.name,
						filename: `${component.name}.svelte`
					},
					options
				),
				entry: component.name === 'App',
				return_ast
			});
		});
	}

	destroy() {
		this.worker.terminate();
	}
}
