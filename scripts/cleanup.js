import { rm, readdir } from 'node:fs/promises'

const topLevelNodeModules = rm('./node_modules', { recursive: true, force: true })

const docsNodeModules = rm('./docs/node_modules', { recursive: true, force: true })
const docsAstro = rm('./docs/.astro', { recursive: true, force: true })

const packageDirs = (await readdir('./packages', { withFileTypes: true }))
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)

const packageRemovals = packageDirs.flatMap((name) => [
  rm(`./packages/${name}/node_modules`, { recursive: true, force: true }),
  rm(`./packages/${name}/.svelte-kit`, { recursive: true, force: true }),
  rm(`./packages/${name}/dist`, { recursive: true, force: true })
])

await Promise.all([topLevelNodeModules, docsNodeModules, docsAstro, ...packageRemovals])

console.log('Cleanup complete.')
