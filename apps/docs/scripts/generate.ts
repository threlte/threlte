import { readFileSync } from 'fs'
import { svelte2tsx } from 'svelte2tsx'
import { createSourceFile, ScriptTarget } from 'typescript'
import { Project } from 'ts-morph'

// gather all exports from extra packages index.ts
// export { default as Canvas } from './Canvas.svelte'
const filepath = '../../../packages/core/src/lib/Canvas.svelte'

// then throw those exports into svelte2tsx
const source = readFileSync(filepath, 'utf-8')

const { code } = svelte2tsx(source, {
  filename: 'Canvas.svelte',
  mode: 'ts'
})

// with the tsx, use typescript
// const sourceFile = createSourceFile('Canvas.svelte', code, ScriptTarget.Latest, true)

// or ts-morph
const project = new Project()
const sourceFile = project.createSourceFile('./temp.tsx', code)

// console.log(sourceFile)
console.log(sourceFile.getFilePath())

// Aiming for this:
// {
//   props: [
//     { name: 'dpr', type: 'number', default: 'window.devicePixelRatio' },
//     {
//       name: 'toneMapping',
//       type: {
//         name: 'THREE.ToneMapping',
//         url: 'https://threejs.org/docs/index.html#api/en/constants/Renderer'
//       },
//       default: 'THREE.AgXToneMapping',
//       description: 'renderer.toneMapping'
//     },
//     {
//       name: 'colorSpace',
//       type: {
//         name: 'THREE.ColorSpace',
//         url: 'https://github.com/mrdoob/three.js/blob/705e47d035591cb5a2e9cc83aa3576e21a4bf2c0/src/constants.js#L149-L153'
//       },
//       default: 'srgb'
//     },
//     {
//       name: 'colorManagementEnabled',
//       type: {
//         name: 'boolean',
//         url: 'https://threejs.org/docs/#manual/en/introduction/Color-management'
//       },
//       default: 'true'
//     },
//     { name: 'renderMode', type: "'always' | 'on-demand' | 'manual'", default: "'on-demand'" },
//     {
//       name: 'autoRender',
//       type: 'boolean',
//       default: 'true',
//       description:
//         'Whether to automatically render the scene every frame. Set to `false` to implement custom render pipelines.'
//     },
//     {
//       name: 'shadows',
//       type: 'boolean | THREE.ShadowMapType',
//       default: 'THREE.PCFSoftShadowMap'
//     },
//     {
//       name: 'createRenderer',
//       type: '(canvas: HTMLCanvasElement) => THREE.Renderer',
//       description:
//         'To set up a custom renderer, pass a function that returns a new renderer instance.'
//     }
//   ]
// }
