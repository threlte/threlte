import * as rollup from 'rollup/dist/es/rollup.browser.js';
import { sleep } from 'yootils';
import commonjs from './plugins/commonjs.js';
import glsl from './plugins/glsl.js';
import json from './plugins/json.js';
import replace from './plugins/replace.js';

self.window = self; // egregious hack to get magic-string to work in a worker

let packagesUrl;
let svelteUrl;
let current_id;

let fulfil_ready;
const ready = new Promise((f) => {
	fulfil_ready = f;
});

self.addEventListener('message', async (event) => {
	switch (event.data.type) {
		case 'init':
			packagesUrl = event.data.packagesUrl;
			svelteUrl = event.data.svelteUrl;

			try {
				importScripts(`${svelteUrl}/compiler.js`);
			} catch {
				await import(/* @vite-ignore */ `${svelteUrl}/compiler.js`);
			}

			fulfil_ready();
			break;

		case 'bundle':
			await ready;
			const { uid, components } = event.data;

			if (components.length === 0) return;

			current_id = uid;

			setTimeout(async () => {
				if (current_id !== uid) return;

				const result = await bundle({ uid, components });

				if (result.error === ABORT) return;
				if (result && uid === current_id) postMessage(result);
			});

			break;
	}
});

let cached = {
	dom: {},
	ssr: {}
};

const ABORT = { aborted: true };

const fetch_cache = new Map();
async function fetch_if_uncached(url, uid) {
	if (fetch_cache.has(url)) {
		return fetch_cache.get(url);
	}

	await sleep(200);
	if (uid !== current_id) throw ABORT;

	const promise = fetch(url)
		.then(async (r) => {
			if (r.ok) {
				return {
					url: r.url,
					body: await r.text()
				};
			}

			throw new Error(await r.text());
		})
		.catch((err) => {
			fetch_cache.delete(url);
			throw err;
		});

	fetch_cache.set(url, promise);
	return promise;
}

async function follow_redirects(url, uid) {
	const res = await fetch_if_uncached(url, uid);
	return res.url;
}

function compare_to_version(major, minor, patch) {
	const v = svelte.VERSION.match(/^(\d+)\.(\d+)\.(\d+)/);
	return v[1] - major || v[2] - minor || v[3] - patch;
}

function is_legacy_package_structure() {
	return compare_to_version(3, 4, 4) <= 0;
}

function has_loopGuardTimeout_feature() {
	return compare_to_version(3, 14, 0) >= 0;
}

async function get_bundle(uid, mode, cache, lookup) {
	let bundle;

	const imports = new Set();
	const warnings = [];
	const all_warnings = [];

	const new_cache = {};

	const repl_plugin = {
		async resolveId(importee, importer) {
			if (uid !== current_id) throw ABORT;

			// importing from Svelte
			if (importee === `svelte`) return `${svelteUrl}/index.mjs`;
			if (importee.startsWith(`svelte/`)) {
				return is_legacy_package_structure()
					? `${svelteUrl}/${importee.slice(7)}.mjs`
					: `${svelteUrl}/${importee.slice(7)}/index.mjs`;
			}

			// importing one Svelte runtime module from another
			if (importer && importer.startsWith(svelteUrl)) {
				const resolved = new URL(importee, importer).href;
				if (resolved.endsWith('.mjs')) return resolved;
				return is_legacy_package_structure() ? `${resolved}.mjs` : `${resolved}/index.mjs`;
			}

			// importing from another file in REPL
			if (importee in lookup && (!importer || importer in lookup)) return importee;
			if (importee + '.js' in lookup) return importee + '.js';
			if (importee + '.json' in lookup) return importee + '.json';

			// remove trailing slash
			if (importee.endsWith('/')) importee = importee.slice(0, -1);

			// importing from a URL
			if (importee.startsWith('http:') || importee.startsWith('https:')) return importee;

			// importing from (probably) unpkg
			if (importee.startsWith('.')) {
				const url = new URL(importee, importer).href;
				self.postMessage({ type: 'status', uid, message: `resolving ${url}` });

				return await follow_redirects(url, uid);
			} else {
				// fetch from unpkg
				self.postMessage({ type: 'status', uid, message: `resolving ${importee}` });

				if (importer in lookup) {
					const match = /^(@[^/]+\/)?[^/]+/.exec(importee);
					if (match) imports.add(match[0]);
				}

				try {
					const pkg_url = await follow_redirects(`${packagesUrl}/${importee}/package.json`, uid);
					const pkg_json = (await fetch_if_uncached(pkg_url, uid)).body;
					const pkg = JSON.parse(pkg_json);

					if (pkg.svelte || pkg.module || pkg.main) {
						const url = pkg_url.replace(/\/package\.json$/, '');
						return new URL(pkg.svelte || pkg.module || pkg.main, `${url}/`).href;
					}
				} catch (err) {
					// ignore
				}

				return await follow_redirects(`${packagesUrl}/${importee}`, uid);
			}
		},
		async load(resolved) {
			if (uid !== current_id) throw ABORT;

			if (resolved in lookup) return lookup[resolved].source;

			if (!fetch_cache.has(resolved)) {
				self.postMessage({ type: 'status', uid, message: `fetching ${resolved}` });
			}

			const res = await fetch_if_uncached(resolved, uid);
			return res.body;
		},
		transform(code, id) {
			if (uid !== current_id) throw ABORT;

			self.postMessage({ type: 'status', uid, message: `bundling ${id}` });

			if (!/\.svelte$/.test(id)) return null;

			const name = id.split('/').pop().split('.')[0];

			const result =
				cache[id] && cache[id].code === code
					? cache[id].result
					: svelte.compile(
							code,
							Object.assign(
								{
									generate: mode,
									format: 'esm',
									dev: true,
									filename: name + '.svelte'
								},
								has_loopGuardTimeout_feature() && {
									loopGuardTimeout: 100
								}
							)
					  );

			new_cache[id] = { code, result };

			(result.warnings || result.stats.warnings).forEach((warning) => {
				// TODO remove stats post-launch
				warnings.push({
					message: warning.message,
					filename: warning.filename,
					start: warning.start,
					end: warning.end
				});
			});

			return result.js;
		}
	};

	try {
		bundle = await rollup.rollup({
			input: './App.svelte',
			plugins: [
				repl_plugin,
				commonjs,
				json,
				glsl,
				replace({
					'process.env.NODE_ENV': JSON.stringify('production')
				})
			],
			inlineDynamicImports: true,
			onwarn(warning) {
				all_warnings.push({
					message: warning.message
				});
			}
		});

		return {
			bundle,
			imports: Array.from(imports),
			cache: new_cache,
			error: null,
			warnings,
			all_warnings
		};
	} catch (error) {
		return { error, imports: null, bundle: null, cache: new_cache, warnings, all_warnings };
	}
}

async function bundle({ uid, components }) {
	if (import.meta.env.PROD) {
		console.clear();
		console.log(`running Svelte compiler version %c${svelte.VERSION}`, 'font-weight: bold');
	}

	const lookup = {};
	components.forEach((component) => {
		const path = `./${component.name}.${component.type}`;
		lookup[path] = component;
	});

	let dom;
	let error;

	try {
		dom = await get_bundle(uid, 'dom', cached.dom, lookup);
		if (dom.error) {
			throw dom.error;
		}

		cached.dom = dom.cache;

		const dom_result = (
			await dom.bundle.generate({
				format: 'iife',
				name: 'SvelteComponent',
				exports: 'named',
				sourcemap: true
			})
		).output[0];

		const ssr = false // TODO how can we do SSR?
			? await get_bundle(uid, 'ssr', cached.ssr, lookup)
			: null;

		if (ssr) {
			cached.ssr = ssr.cache;
			if (ssr.error) {
				throw ssr.error;
			}
		}

		const ssr_result = ssr
			? (
					await ssr.bundle.generate({
						format: 'iife',
						name: 'SvelteComponent',
						exports: 'named',
						sourcemap: true
					})
			  ).output[0]
			: null;

		return {
			uid,
			dom: dom_result,
			ssr: ssr_result,
			imports: dom.imports,
			warnings: dom.warnings,
			error: null
		};
	} catch (err) {
		console.error(err);

		const e = error || err;
		delete e.toString;

		return {
			uid,
			dom: null,
			ssr: null,
			imports: null,
			warnings: dom.warnings,
			error: Object.assign({}, e, {
				message: e.message,
				stack: e.stack
			})
		};
	}
}
