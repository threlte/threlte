import fs from 'node:fs';
import path from 'node:path';
import addon from '../src/index.js';
import { setupTest } from './setup/suite.js';

const browser = false;

const { test, testCases } = setupTest(
	{ threlte: addon },
	{
		kinds: [
			{ type: 'default', options: { threlte: { packages: ['extras'], demo: true } } },
			{ type: 'with-rapier', options: { threlte: { packages: ['extras', 'rapier'], demo: true } } },
			{ type: 'with-theatre', options: { threlte: { packages: ['extras', 'theatre'], demo: true } } },
			{ type: 'with-xr', options: { threlte: { packages: ['extras', 'xr'], demo: true } } },
			{
				type: 'with-all',
				options: {
					threlte: { packages: ['extras', 'rapier', 'theatre', 'xr', 'flex', 'studio', 'gltf'], demo: true }
				}
			},
			{ type: 'no-demo', options: { threlte: { packages: ['extras'], demo: false } } }
		],
		filter: (testCase) => testCase.variant.includes('kit'),
		browser
	}
);

test.concurrent.for(testCases)('threlte $kind.type $variant', (testCase, { expect, ...ctx }) => {
	const cwd = ctx.cwd(testCase);
	const language = testCase.variant.includes('ts') ? 'ts' : 'js';

	const pkgJsonPath = path.resolve(cwd, 'package.json');
	const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));

	expect(pkgJson.dependencies).toHaveProperty('three');
	expect(pkgJson.devDependencies).toHaveProperty('@threlte/core');

	if (language === 'ts') {
		expect(pkgJson.devDependencies).toHaveProperty('@types/three');
	}

	if (testCase.kind.type === 'default') {
		expect(pkgJson.dependencies).toHaveProperty('@threlte/extras');
	}

	if (testCase.kind.type === 'with-rapier') {
		expect(pkgJson.dependencies).toHaveProperty('@threlte/rapier');
		expect(pkgJson.dependencies).toHaveProperty('@dimforge/rapier3d-compat');
	}

	if (testCase.kind.type === 'with-theatre') {
		expect(pkgJson.dependencies).toHaveProperty('@threlte/theatre');
		expect(pkgJson.dependencies).toHaveProperty('@theatre/core');
		expect(pkgJson.dependencies).toHaveProperty('@theatre/studio');
	}

	if (testCase.kind.type === 'with-xr') {
		expect(pkgJson.dependencies).toHaveProperty('@threlte/xr');
	}

	if (testCase.kind.type === 'with-xr' && language === 'ts') {
		expect(pkgJson.devDependencies).toHaveProperty('@types/webxr');
	}

	if (testCase.kind.type === 'with-all') {
		expect(pkgJson.dependencies).toHaveProperty('@threlte/extras');
		expect(pkgJson.dependencies).toHaveProperty('@threlte/rapier');
		expect(pkgJson.dependencies).toHaveProperty('@dimforge/rapier3d-compat');
		expect(pkgJson.dependencies).toHaveProperty('@threlte/theatre');
		expect(pkgJson.dependencies).toHaveProperty('@theatre/core');
		expect(pkgJson.dependencies).toHaveProperty('@theatre/studio');
		expect(pkgJson.dependencies).toHaveProperty('@threlte/xr');
		expect(pkgJson.dependencies).toHaveProperty('@threlte/flex');
		expect(pkgJson.dependencies).toHaveProperty('@threlte/studio');
		expect(pkgJson.devDependencies).toHaveProperty('@threlte/gltf');
	}

	if (testCase.kind.type === 'with-all' && language === 'ts') {
		expect(pkgJson.devDependencies).toHaveProperty('@types/webxr');
	}

	const demoPagePath = path.resolve(cwd, 'src/routes/demo/threlte/+page.svelte');
	const scenePath = path.resolve(cwd, 'src/routes/demo/threlte/Scene.svelte');
	const demoIndexPath = path.resolve(cwd, 'src/routes/demo/+page.svelte');

	const isWithDemo = testCase.kind.type !== 'no-demo';

	if (isWithDemo) {
		expect(fs.existsSync(demoPagePath)).toBe(true);
		expect(fs.existsSync(scenePath)).toBe(true);
		expect(fs.existsSync(demoIndexPath)).toBe(true);

		const demoPageContent = fs.readFileSync(demoPagePath, 'utf8');
		expect(demoPageContent).toContain('Threlte Demo');
		expect(demoPageContent).toContain("import { Canvas } from '@threlte/core'");

		const sceneContent = fs.readFileSync(scenePath, 'utf8');
		expect(sceneContent).toContain("import { T } from '@threlte/core'");
		expect(sceneContent).toContain("import { OrbitControls } from '@threlte/extras'");

		const demoIndexContent = fs.readFileSync(demoIndexPath, 'utf8');
		expect(demoIndexContent).toContain('/demo/threlte');
	} else {
		expect(fs.existsSync(demoPagePath)).toBe(false);
		expect(fs.existsSync(scenePath)).toBe(false);
	}
});
