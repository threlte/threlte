import type { Loader } from 'astro/loaders'
import { z } from 'astro/zod'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { normalizePath } from 'vite'
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

let detachWatcher: (() => void) | undefined

export const componentProps = (packages: string[]): Loader => ({
  name: 'component-props',
  schema: componentPropsSchema,
  async load({ store, parseData, generateDigest, logger, watcher }) {
    const libs = packages.map((name) => join(repoRoot, 'packages', name, 'src', 'lib'))

    const sync = async () => {
      const entries = []
      for (const lib of libs) {
        for (const signature of parsePackageComponents(repoRoot, lib)) {
          const data = await parseData({ id: signature.sourcePath, data: { ...signature } })
          entries.push({ id: signature.sourcePath, data, digest: generateDigest(data) })
        }
      }
      const ids = new Set(entries.map((entry) => entry.id))
      for (const id of store.keys()) if (!ids.has(id)) store.delete(id)
      for (const entry of entries) store.set(entry)
      logger.info(`Loaded ${entries.length} component signatures`)
    }

    await sync()

    let syncing: Promise<void> | undefined
    let pending = false
    let timeout: ReturnType<typeof setTimeout> | undefined

    const runSync = async () => {
      if (syncing) {
        pending = true
        return
      }
      syncing = sync()
      try {
        await syncing
      } catch (error) {
        logger.error(`Failed to load component signatures: ${error}`)
      } finally {
        syncing = undefined
      }
      if (pending) {
        pending = false
        await runSync()
      }
    }

    if (!watcher) return

    detachWatcher?.()
    for (const lib of libs) watcher.add(lib)
    const libPrefixes = libs.map((lib) => `${normalizePath(lib)}/`)
    const resync = (path: string) => {
      const changed = normalizePath(path)
      if (!libPrefixes.some((prefix) => changed.startsWith(prefix))) return
      if (!/\.(ts|svelte)$/.test(changed)) return
      clearTimeout(timeout)
      timeout = setTimeout(() => void runSync(), 200)
    }
    watcher.on('change', resync)
    watcher.on('add', resync)
    watcher.on('unlink', resync)
    detachWatcher = () => {
      clearTimeout(timeout)
      watcher.off('change', resync)
      watcher.off('add', resync)
      watcher.off('unlink', resync)
    }
  }
})
