import 'jsdom-global'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as prettier from 'prettier'
import { transform } from './utils/transform.js'
import { parse } from './utils/parser.js'
import { GLTFLoader } from './bin/GLTFLoader.js'
import { DRACOLoader } from './bin/DRACOLoader.js'

globalThis.self = globalThis

const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
gltfLoader.setDRACOLoader(draco)

export default async function (file, output, options) {
  try {
    await fs.stat(file)
  } catch {
    throw new Error(`${file} does not exist.`)
  }

  // Process GLTF
  if (options.transform || options.instance || options.instanceall) {
    const { name } = path.parse(file)
    const transformOut = path.join(`${name}-transformed.glb`)
    await transform(file, transformOut, options)
    file = transformOut
  }

  const filePath = `${options.root ?? '/'}${options.root ? path.basename(file) : path.normalize(file)}`
  const data = await fs.readFile(file)
  const gltf = await gltfLoader.parseAsync(data.buffer)

  const raw = parse(filePath, gltf, options)

  const prettiered = await prettier.format(raw, {
    singleQuote: true,
    trailingComma: 'es5',
    semi: false,
    printWidth: 100,
    parser: 'svelte',
    plugins: ['prettier-plugin-svelte'],
    overrides: [
      {
        files: '*.svelte',
        options: { parser: 'svelte' }
      }
    ],
    singleAttributePerLine: true
  })

  await fs.writeFile(output, prettiered)
}
