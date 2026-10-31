import type { Loader } from 'astro/loaders'
import { z } from 'astro/zod'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { parsePackageComponents } from './parseComponentProps'

export const componentPropsSchema = z.object({
  sourcePath: z.string(),
  props: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      required: z.boolean(),
      default: z.string().optional(),
      description: z.string().optional()
    })
  ),
  events: z.array(
    z.object({
      name: z.string(),
      payload: z.string(),
      description: z.string().optional()
    })
  ),
  bindings: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      description: z.string().optional()
    })
  )
})

const repoRoot = fileURLToPath(new URL('../../../../', import.meta.url))

/**
 * Loads the props, events and bindings of every component in the given
 * packages from their `types.ts` interfaces, keyed by the component's
 * `sourcePath` so reference pages can look up their own entry.
 */
export const componentProps = (packages: string[]): Loader => ({
  name: 'component-props',
  schema: componentPropsSchema,
  async load({ store, parseData, logger, watcher }) {
    const libs = packages.map((name) => join(repoRoot, 'packages', name, 'src', 'lib'))

    const sync = async () => {
      store.clear()
      let count = 0
      for (const lib of libs) {
        for (const signature of parsePackageComponents(repoRoot, lib)) {
          const data = await parseData({ id: signature.sourcePath, data: { ...signature } })
          store.set({ id: signature.sourcePath, data })
          count++
        }
      }
      logger.info(`Loaded ${count} component signatures`)
    }

    await sync()

    for (const lib of libs) watcher?.add(lib)
    const resync = (path: string) => {
      if (libs.some((lib) => path.startsWith(lib)) && /\.(ts|svelte)$/.test(path)) void sync()
    }
    watcher?.on('change', resync)
    watcher?.on('add', resync)
    watcher?.on('unlink', resync)
  }
})
