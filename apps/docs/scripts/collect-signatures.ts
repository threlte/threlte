import { readFileSync, writeFileSync } from 'fs'
import { join, resolve, basename } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { readdirSync, statSync } from 'fs'
import type { ComponentData } from './generate.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const REFERENCE_DIR = resolve(__dirname, '../src/content/reference')

function getAllMdxFiles(dir: string): string[] {
  const files: string[] = []

  function traverse(currentDir: string) {
    const items = readdirSync(currentDir)
    for (const item of items) {
      const fullPath = join(currentDir, item)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        traverse(fullPath)
      } else if (item.endsWith('.mdx')) {
        files.push(fullPath)
      }
    }
  }

  traverse(dir)
  return files
}

function collectSignatures() {
  const mdxFiles = getAllMdxFiles(REFERENCE_DIR)
  const signatures: Record<string, ComponentData> = {}

  for (const filePath of mdxFiles) {
    try {
      const content = readFileSync(filePath, 'utf-8')
      const { data } = matter(content)

      if (data.componentSignature) {
        const { name, packageName } = getNameAndPackage(data)
        let x: ComponentData = {
          name,
          package: packageName
        }
        if ('props' in data.componentSignature) {
          x['props'] = data.componentSignature.props
        }
        if ('events' in data.componentSignature) {
          x['events'] = data.componentSignature.events
        }
        if ('exports' in data.componentSignature) {
          x['exports'] = data.componentSignature.exports
        }

        signatures[x.name] = x
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error)
    }
  }

  const outputPath = resolve(__dirname, 'component-signatures.json')
  writeFileSync(outputPath, JSON.stringify(signatures, null, 2))
  console.log(
    `Collected signatures from ${Object.keys(signatures).length} files and saved to: ${outputPath}`
  )
}

function getNameAndPackage(data: any) {
  // "packages/core/src/lib/Canvas.svelte",
  let name = ''
  let packageName = ''
  try {
    const [, second] = data.sourcePath.split('/')
    packageName = second
    name = basename(data.sourcePath, '.svelte')
  } catch (error) {
    packageName = data.category.split('/')[1]
    name = data.title.replace(/<|>/g, '')
  }

  if (name.endsWith('.svelte.ts')) {
    name = name.replace('.svelte.ts', '')
  }

  return { name, packageName }
}

collectSignatures()
