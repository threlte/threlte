var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as prettier from 'prettier';
import { preprocess } from 'svelte/compiler';
import { preprocessThrelte } from '../src/index.js';
const format = (component) => {
    return prettier.format(component, {
        semi: false,
        bracketSameLine: true,
        printWidth: 80,
        singleQuote: true,
        parser: 'svelte',
        pluginSearchDirs: ['.'],
        svelteBracketNewLine: true
    });
};
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const dir = readdirSync('./test/components', { encoding: 'utf-8' });
    const tests = dir
        .filter((f) => !f.includes('expected'))
        .map((filename) => {
        const raw = readFileSync(resolve('./test/components', filename), {
            encoding: 'utf-8'
        });
        const baseName = filename.replace('.svelte', '');
        const expected = dir.includes(`${baseName}.expected.svelte`)
            ? readFileSync(resolve('./test/components', `${baseName}.expected.svelte`), {
                encoding: 'utf-8'
            })
            : undefined;
        return {
            filename,
            raw,
            result: '',
            expected
        };
    });
    for (const test of tests) {
        const preprocessed = yield preprocess(test.raw, preprocessThrelte(), {
            filename: test.filename
        });
        test.result = format(preprocessed.code);
        if (test.expected) {
            if (test.result !== test.expected) {
                const baseName = test.filename.replace('.svelte', '');
                writeFileSync(resolve('./test/components', `${baseName}.failed.svelte`), test.result, {
                    encoding: 'utf-8'
                });
                throw new Error(`Test failed for ${test.filename}, result written to ${baseName}.failed.svelte`);
            }
        }
        else {
            // Write the result to the expected file
            const baseName = test.filename.replace('.svelte', '');
            writeFileSync(resolve('./test/components', `${baseName}.expected.svelte`), test.result, {
                encoding: 'utf-8'
            });
        }
    }
    console.log('All tests passed');
});
init();
