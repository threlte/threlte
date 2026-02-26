import { chromium } from '@playwright/test';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { add } from 'sv';
import { createProject, addPnpmBuildDependencies, prepareServer } from 'sv/testing';
import { inject, test as vitestTest, beforeAll, beforeEach } from 'vitest';

const cwd = inject('testDir');
const templatesDir = inject('templatesDir');
const variants = inject('variants');

/**
 * @template {import('sv').AddonMap} AddonMap
 * @param {AddonMap} addons
 * @param {import('sv/testing').SetupTestOptions<AddonMap>} [options]
 * @returns {{ test: ReturnType<typeof vitestTest.extend<import('sv/testing').Fixtures>>, testCases: Array<import('sv/testing').AddonTestCase<AddonMap>>, prepareServer: typeof prepareServer }}
 */
export function setupTest(addons, options) {
	/** @type {ReturnType<typeof vitestTest.extend<import('sv/testing').Fixtures>>} */
	// @ts-ignore - vitest.extend expects fixtures object but we provide it in beforeEach
	const test = vitestTest.extend({});

	const withBrowser = options?.browser ?? true;

	/** @type {ReturnType<typeof createProject>} */
	let create;
	/** @type {Awaited<ReturnType<typeof chromium.launch>>} */
	let browser;

	if (withBrowser) {
		beforeAll(async () => {
			browser = await chromium.launch();
			return async () => {
				await browser.close();
			};
		});
	}

	/** @type {Array<import('sv/testing').AddonTestCase<AddonMap>>} */
	const testCases = [];
	for (const kind of options?.kinds ?? []) {
		for (const variant of variants) {
			const addonTestCase = { variant, kind };
			if (options?.filter === undefined || options.filter(addonTestCase)) {
				testCases.push(addonTestCase);
			}
		}
	}
	/** @type {string} */
	let testName;
	test.beforeAll(async ({ name }) => {
		testName = path.dirname(name).split('/').at(-1) ?? '';

		// constructs a builder to create test projects
		create = createProject({ cwd, templatesDir, testName });

		// creates a pnpm workspace in each addon dir
		fs.writeFileSync(
			path.resolve(cwd, testName, 'pnpm-workspace.yaml'),
			"packages:\n  - '**/*'",
			'utf8'
		);

		// creates a barebones package.json in each addon dir
		fs.writeFileSync(
			path.resolve(cwd, testName, 'package.json'),
			JSON.stringify({
				name: `${testName}-workspace-root`,
				private: true
			})
		);

		for (const addonTestCase of testCases) {
			const { variant, kind } = addonTestCase;
			const cwd = create({ testId: `${kind.type}-${variant}`, variant });

			// test metadata
			const metaPath = path.resolve(cwd, 'meta.json');
			fs.writeFileSync(metaPath, JSON.stringify({ variant, kind }, null, '\t'), 'utf8');

			if (options?.preAdd) {
				await options.preAdd({ addonTestCase, cwd });
			}
			const { pnpmBuildDependencies } = await add({
				cwd,
				addons,
				options: kind.options,
				packageManager: 'pnpm'
			});
			await addPnpmBuildDependencies(cwd, 'pnpm', ['esbuild', ...pnpmBuildDependencies]);
		}

		execSync('pnpm install', { cwd: path.resolve(cwd, testName), stdio: 'pipe' });
	});

	// runs before each test case
	/**
	 * @param {import('sv/testing').Fixtures & import('vitest').TestContext} ctx
	 */
	beforeEach(async (ctx) => {
		/** @type {Awaited<ReturnType<typeof browser.newContext>>} */
		let browserCtx;
		if (withBrowser) {
			browserCtx = await browser.newContext();
			/** @type {import('sv/testing').Fixtures} */ (/** @type {unknown} */ (ctx)).page =
				await browserCtx.newPage();
		}

		/**
		 * @param {import('sv/testing').AddonTestCase<Addons>} addonTestCase
		 * @returns {string}
		 */
		/** @type {import('sv/testing').Fixtures} */ (/** @type {unknown} */ (ctx)).cwd = (
			addonTestCase
		) => {
			return path.join(cwd, testName, `${addonTestCase.kind.type}-${addonTestCase.variant}`);
		};

		return async () => {
			if (withBrowser) {
				await browserCtx.close();
			}
			// ...other tear downs
		};
	});

	return { test, testCases, prepareServer };
}
