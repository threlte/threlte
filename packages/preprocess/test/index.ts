import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import * as prettier from 'prettier'
import { preprocess } from 'svelte/compiler'
import { preprocessThrelte } from '../src/index.js'

const format = (component: string) => {
  return prettier.format(component, {
    semi: false,
    bracketSameLine: true,
    printWidth: 80,
    singleQuote: true,
    parser: 'svelte',
    pluginSearchDirs: ['.'],
    svelteBracketNewLine: true
  } as any)
}

type Test = {
  filename: string
  raw: string
  result: string
  expected?: string
}

const init = async () => {
  const dir = readdirSync('./test/components', { encoding: 'utf-8' })

  const tests = dir
    .filter((f) => !f.includes('expected'))
    .map((filename): Test => {
      const raw = readFileSync(resolve('./test/components', filename), {
        encoding: 'utf-8'
      })
      const baseName = filename.replace('.svelte', '')

      const expected = dir.includes(`${baseName}.expected.svelte`)
        ? readFileSync(resolve('./test/components', `${baseName}.expected.svelte`), {
            encoding: 'utf-8'
          })
        : undefined

      return {
        filename,
        raw,
        result: '',
        expected
      }
    })

  for (const test of tests) {
    const preprocessed = await preprocess(test.raw, preprocessThrelte(), {
      filename: test.filename
    })
    test.result = format(preprocessed.code)

    if (test.expected) {
      if (test.result !== test.expected) {
        const baseName = test.filename.replace('.svelte', '')
        writeFileSync(resolve('./test/components', `${baseName}.failed.svelte`), test.result, {
          encoding: 'utf-8'
        })
        throw new Error(
          `Test failed for ${test.filename}, result written to ${baseName}.failed.svelte`
        )
      }
    } else {
      // Write the result to the expected file
      const baseName = test.filename.replace('.svelte', '')
      writeFileSync(resolve('./test/components', `${baseName}.expected.svelte`), test.result, {
        encoding: 'utf-8'
      })
    }
  }

  console.log('All tests passed')
}

init()
