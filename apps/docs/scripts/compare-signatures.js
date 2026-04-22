import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const manualPath = join(__dirname, 'component-signatures.json')
const generatedPath = join(__dirname, 'component-signatures-generated.json')

const manual = JSON.parse(readFileSync(manualPath, 'utf8'))
const generated = JSON.parse(readFileSync(generatedPath, 'utf8'))

function deepDiff(obj1, obj2, path = '') {
  const diffs = []
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const allKeys = new Set([...keys1, ...keys2])

  for (const key of allKeys) {
    const fullPath = path ? `${path}.${key}` : key
    if (!(key in obj1)) {
      diffs.push({ type: 'added', path: fullPath, value: obj2[key] })
    } else if (!(key in obj2)) {
      diffs.push({ type: 'removed', path: fullPath, value: obj1[key] })
    } else if (typeof obj1[key] !== typeof obj2[key]) {
      diffs.push({ type: 'changed', path: fullPath, old: obj1[key], new: obj2[key] })
    } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      diffs.push(...deepDiff(obj1[key], obj2[key], fullPath))
    } else if (obj1[key] !== obj2[key]) {
      diffs.push({ type: 'changed', path: fullPath, old: obj1[key], new: obj2[key] })
    }
  }
  return diffs
}

let output = 'Comparing component signatures...\n\n'

const manualComps = Object.keys(manual)
const generatedComps = Object.keys(generated)

const allComps = new Set([...manualComps, ...generatedComps])

for (const comp of allComps) {
  if (!(comp in manual)) {
    output += `Component "${comp}" added in generated (not in manual)\n`
  } else if (!(comp in generated)) {
    output += `Component "${comp}" removed in generated (present in manual)\n`
  } else {
    const diffs = deepDiff(manual[comp], generated[comp])
    if (diffs.length > 0) {
      output += `Component "${comp}" has differences:\n`
      for (const diff of diffs) {
        if (diff.type === 'changed') {
          output += `  ${diff.type}: ${diff.path} - old: ${JSON.stringify(diff.old)}, new: ${JSON.stringify(diff.new)}\n`
        } else {
          output += `  ${diff.type}: ${diff.path} - ${JSON.stringify(diff.value)}\n`
        }
      }
      output += '\n'
    }
  }
}

output += 'Comparison complete.'

console.log(output)
writeFileSync(join(__dirname, 'comparison-output.txt'), output)

console.log(output)
writeFileSync(join(__dirname, 'comparison-output.txt'), output)
