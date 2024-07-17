import 'jsdom-global'
import fs from 'fs'
import path from 'path'
import transform from './utils/transform.js'
// import { GLTFLoader, DRACOLoader } from 'three-stdlib'
import * as prettier from 'prettier'
import THREE from 'three'

global.THREE = THREE

import './bin/GLTFLoader.js'
import DracoLoader from './bin/DRACOLoader.js'
THREE.DRACOLoader.getDecoderModule = () => {}

import parse from './utils/parser.js'

const gltfLoader = new THREE.GLTFLoader()
gltfLoader.setDRACOLoader(new DracoLoader())

function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length)
  var view = new Uint8Array(ab)
  for (var i = 0; i < buf.length; ++i) view[i] = buf[i]
  return ab
}

export default function (file, output, options) {
  function getFilePath(file) {
    return `${options.root ?? '/'}${options.root ? path.basename(file) : path.normalize(file)}`
  }

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(output)
    stream.once('open', async (fd) => {
      if (!fs.existsSync(file)) {
        reject(file + ' does not exist.')
      } else {
        // Process GLTF
        if (options.transform || options.instance || options.instanceall) {
          const { name } = path.parse(file)
          const transformOut = path.join(name + '-transformed.glb')
          await transform(file, transformOut, options)
          file = transformOut
        }
        resolve()

        const filePath = getFilePath(file)
        const data = fs.readFileSync(file)
        const arrayBuffer = toArrayBuffer(data)

        gltfLoader.parse(
          arrayBuffer,
          '',
          async (gltf) => {
            const raw = parse(filePath, gltf, options)
            try {
              const prettiered = await prettier.format(raw, {
                singleQuote: true,
                trailingComma: 'none',
                semi: false,
                printWidth: 100,
                parser: 'svelte',
                plugins: ['prettier-plugin-svelte'],
                overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
                singleAttributePerLine: true
              })
              stream.write(prettiered)
              stream.end()
              resolve()
            } catch (error) {
              console.error(error)
              stream.write(raw)
              stream.end()
              reject(error)
            }
          },
          reject
        )
      }
    })
  })
}
