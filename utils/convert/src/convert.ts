import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import glob from 'readdir-glob'

// replace `<Three[…]type={` with `<T[…]is=`
const threeComponentRegex = /(<Three)(.*?)(type={){1}/gs

// replace `import { Three } from '@threlte/core'` with `import { T } from '@threlte/core'` warning: must check if `T` is in that import too.
const importRegex = /(import)(.*?)(Three)(.*?)(from '@threlte\/core')/gs

const init = () => {
  // console.log(resolve(__dirname, '../../..'))

  const globber = glob(resolve(__dirname, '../../..'), {
    pattern: '**/*.svelte'
  })

  globber.on('match', (match) => {
    console.log(match.absolute)

    const contents = readFileSync(match.absolute, { encoding: 'utf-8' })

    const replacedComponentsContent = contents.replace(threeComponentRegex, '<T$2is={')

    const finalFileContents = replacedComponentsContent.replace(importRegex, '$1$2T$4$5')

    writeFileSync(match.absolute, finalFileContents, {
      encoding: 'utf-8'
    })
  })
  globber.on('error', (err) => {
    console.error('fatal error', err)
  })
  globber.on('end', (m) => {
    console.log('done')
  })
}

init()
