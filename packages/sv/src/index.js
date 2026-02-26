import { defineAddon, defineAddonOptions } from 'sv/core';

const packages = [
	{
		id: 'extras',
		package: '@threlte/extras',
		version: '^9.8.1',
		description: 'Components, helpers, hooks and more'
	},
	{
		id: 'rapier',
		package: '@threlte/rapier',
		version: '^3.2.0',
		description: 'Physics engine',
		dependencies: [{ package: '@dimforge/rapier3d-compat', version: '^0.19.0' }]
	},
	{
		id: 'theatre',
		package: '@threlte/theatre',
		version: '^3.1.2',
		description: 'Animation library',
		dependencies: [
			{ package: '@theatre/core', version: '^0.7.2' },
			{ package: '@theatre/studio', version: '^0.7.2' }
		]
	},
	{
		id: 'xr',
		package: '@threlte/xr',
		version: '^1.3.0',
		description: 'VR and AR support'
	},
	{
		id: 'flex',
		package: '@threlte/flex',
		version: '^2.2.0',
		description: 'Flexbox in 3D'
	},
	{
		id: 'studio',
		package: '@threlte/studio',
		version: '^0.3.0',
		description: 'Visual editor'
	},
	{
		id: 'gltf',
		package: '@threlte/gltf',
		version: '^3.0.1',
		dev: true,
		description: 'CLI tool for GLTF conversion'
	},
	{
		id: 'uikit',
		package: 'threlte-uikit',
		version: '^1.2.1',
		description: 'UI toolkit for Threlte'
	}
];

const options = defineAddonOptions()
	.add('demo', {
		type: 'boolean',
		default: false,
		question: 'Do you want to include a demo?'
	})
	.add('packages', {
		type: 'multiselect',
		question: 'Which Threlte packages would you like to add?',
		options: packages.map((p) => ({
			value: p.id,
			label: p.package,
			hint: p.description
		})),
		default: ['extras'],
		required: false
	})
	.build();

export default defineAddon({
	id: 'threlte',
	shortDescription: '3D rendering framework',
	homepage: 'https://threlte.xyz',
	options,

	setup: ({ kit, unsupported }) => {
		if (!kit) unsupported('Requires SvelteKit');
	},

	run: ({ sv, options, language, kit, cancel }) => {
		if (!kit) return cancel('SvelteKit is required');

		const routesDirectory = kit.routesDirectory;
		sv.dependency('three', '^0.176.0');
		sv.devDependency('@threlte/core', '^8.4.0');

		if (language === 'ts') {
			sv.devDependency('@types/three', '^0.176.0');
		}

		for (const pkgId of options.packages) {
			const pkg = packages.find((p) => p.id === pkgId);
			if (!pkg) continue;

			const version = pkg.version;

			if (pkg.dev) {
				sv.devDependency(pkg.package, version);
			} else {
				sv.dependency(pkg.package, version);
			}

			if (pkg.dependencies) {
				for (const dep of pkg.dependencies) {
					sv.dependency(dep.package, dep.version);
				}
			}

			if (pkgId === 'xr' && language === 'ts') {
				sv.devDependency('@types/webxr', '^0.5.14');
			}
		}

		if (options.demo) {
			const lang = language === 'ts' ? 'ts' : 'js';

			sv.file(`${routesDirectory}/demo/threlte/+page.svelte`, () => {
				return `<script lang="${lang}">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
</script>

<h1>Threlte Demo</h1>

<div class="canvas-container">
	<Canvas>
		<Scene />
	</Canvas>
</div>

<style>
	.canvas-container {
		height: 400px;
		width: 100%;
		background: #1a1a1a;
		border-radius: 8px;
		overflow: hidden;
	}
</style>
`;
			});

			sv.file(`${routesDirectory}/demo/threlte/Scene.svelte`, () => {
				return `<script lang="${lang}">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
</script>

<T.PerspectiveCamera makeDefault position={[3, 3, 3]} fov={50}>
	<OrbitControls />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />
<T.DirectionalLight position={[5, 10, 5]} intensity={1} />

<T.Mesh rotation.y={Math.PI / 4}>
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color="orange" />
</T.Mesh>
`;
			});

			sv.file(`${routesDirectory}/demo/+page.svelte`, (content) => {
				if (!content) {
					const lang = language === 'ts' ? 'ts' : 'js';
					return `<script lang="${lang}">
	import { page } from '$app/stores';
</script>

<h1>Demo</h1>

<div class="demos">
	<a href="/demo/threlte">Threlte</a>
</div>
`;
				}

				const demoLink = '\n\t\t<a href="/demo/threlte">Threlte</a>';
				const demosMatch = content.match(/<div class="demos">/);
				if (demosMatch) {
					return content.replace('</div>', `\t\t${demoLink.trim()}\n\t</div>`);
				}

				return content.replace(
					'<h1>Welcome',
					`<div class="demos">${demoLink}\n\t</div>\n\n\t<h1>Welcome`
				);
			});
		}
	}
});
