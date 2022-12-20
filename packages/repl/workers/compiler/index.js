self.window = self; // egregious hack to get magic-string to work in a worker

let fulfil_ready;
const ready = new Promise((f) => {
	fulfil_ready = f;
});

self.addEventListener('message', async (event) => {
	switch (event.data.type) {
		case 'init':
			try {
				importScripts(`${event.data.svelteUrl}/compiler.js`);
			} catch {
				await import(/* @vite-ignore */ `${event.data.svelteUrl}/compiler.js`);
			}

			fulfil_ready();
			break;

		case 'compile':
			await ready;
			postMessage(compile(event.data));
			break;
	}
});

const common_options = {
	dev: false,
	css: false
};

function compile({ id, source, options, return_ast }) {
	try {
		const { js, css, ast } = svelte.compile(source, Object.assign({}, common_options, options));

		return {
			id,
			result: {
				js: js.code,
				css: css.code || `/* Add a <sty` + `le> tag to see compiled CSS */`,
				ast: return_ast ? ast : null
			}
		};
	} catch (err) {
		let message = `/* Error compiling component\n\n${err.message}`;
		if (err.frame) message += `\n${err.frame}`;
		message += `\n\n*/`;

		return {
			id,
			result: {
				js: message,
				css: message
			}
		};
	}
}
