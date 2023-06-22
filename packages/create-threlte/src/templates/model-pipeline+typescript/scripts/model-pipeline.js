import { execSync } from 'node:child_process'
import { readdirSync, copyFileSync, unlinkSync, mkdirSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

/**
 * This script is used to transform gltf and glb files into Threlte components.
 * It uses the `@threlte/gltf` package to do so.
 * It works in two steps:
 * 1. Transform the gltf/glb files located in the sourceDir directory
 * 2. Move the Threlte components to the targetDir directory
 */
const configuration = {
  sourceDir: resolve(join('static', 'models')),
  targetDir: resolve(join('src', 'lib', 'components', 'models')),
  overwrite: false,
  root: '/models/',
  types: true,
  keepnames: false,
  meta: false,
  shadows: false,
  printwidth: 120,
  precision: 2,
  draco: null,
  preload: false,
  suspense: false,
  isolated: false,
  transform: {
    enabled: false,
    resolution: 1024,
    simplify: {
      enabled: false,
      weld: 0.0001,
      ratio: 0.75,
      error: 0.001
    }
  }
}

// if the target directory doesn't exist, create it
mkdirSync(configuration.targetDir, { recursive: true })

// throw error if source directory doesn't exist
if (!existsSync(configuration.sourceDir)) {
  throw new Error(`Source directory ${configuration.sourceDir} doesn't exist.`)
}

// read the directory, filter for .glb and .gltf files and files *not* ending
// with -transformed.gltf or -transformed.glb as these should not be transformed
// again.
const gltfFiles = readdirSync(configuration.sourceDir).filter((file) => {
  return (
    (file.endsWith('.glb') || file.endsWith('.gltf')) &&
    !file.endsWith('-transformed.gltf') &&
    !file.endsWith('-transformed.glb')
  )
})

gltfFiles.forEach((file) => {
  // run the gltf transform command on every file
  const path = join(configuration.sourceDir, file)

  // parse the configuration
  const args = []
  if (configuration.root) args.push(`--root ${configuration.root}`)
  if (configuration.types) args.push('--types')
  if (configuration.keepnames) args.push('--keepnames')
  if (configuration.meta) args.push('--meta')
  if (configuration.shadows) args.push('--shadows')
  args.push(`--printwidth ${configuration.printwidth}`)
  args.push(`--precision ${configuration.precision}`)
  if (configuration.draco) args.push(`--draco ${configuration.draco}`)
  if (configuration.preload) args.push('--preload')
  if (configuration.suspense) args.push('--suspense')
  if (configuration.isolated) args.push('--isolated')
  if (configuration.transform.enabled) {
    args.push(`--transform`)
    args.push(`--resolution ${configuration.transform.resolution}`)
    if (configuration.transform.simplify.enabled) {
      args.push(`--simplify`)
      args.push(`--weld ${configuration.transform.simplify.weld}`)
      args.push(`--ratio ${configuration.transform.simplify.ratio}`)
      args.push(`--error ${configuration.transform.simplify.error}`)
    }
  }
  const formattedArgs = args.join(' ')

  // run the command
  const cmd = `npx @threlte/gltf@next ${path} ${formattedArgs}`
  try {
    execSync(cmd, {
      cwd: configuration.sourceDir
    })
  } catch (error) {
    console.error(`Error transforming model: ${error}`)
  }
})

// read dir again, but search for .svelte files only.
const svelteFiles = readdirSync(configuration.sourceDir).filter((file) => file.endsWith('.svelte'))

svelteFiles.forEach((file) => {
  // now move every file to /src/components/models
  const path = join(configuration.sourceDir, file)
  const newPath = join(configuration.targetDir, file)
  try {
    if (!configuration.overwrite) {
      // check if file already exists
      if (existsSync(newPath)) {
        console.error(`File ${newPath} already exists, skipping.`)
        return
      }
    }
    copyFileSync(path, newPath)
  } catch (error) {
    console.error(`Error copying file: ${error}`)
  }
  // remove the file from /static/models
  try {
    unlinkSync(path)
  } catch (error) {
    console.error(`Error removing file: ${error}`)
  }
})
