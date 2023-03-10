import { exec } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
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
    let contents = readFileSync(match.absolute, { encoding: 'utf-8' })

    if (!contents.includes('<Three')) {
      return
    }

    contents = contents.replace(threeComponentRegex, '<T$2is={')
    contents = contents.replace(/<\/Three>/gs, '</T>')

    if (!contents.match(/(import)(.*?)(T[,\s])(.*?)(from '@threlte\/core')/gs)) {
      contents = contents.replace(importRegex, '$1$2T$4$5')
    } else {
      // the import of `T` is already present, but the import of `Three` must still be removed
      contents = contents.replace(/(import.*), Three, (.*from '.*')/gs, '$1, $2')
      contents = contents.replace(/(import.*){ Three, (.*from '.*')/gs, '$1{ $2')
      contents = contents.replace(/(import.*), Three }(.*from '.*')/gs, '$1 }$2')
      contents = contents.replace(/(import.*){ Three }(.*from '.*')/gs, '$1{ }$2')
      contents = contents.replace(/import.*?{\s*?}(.*?from '.*?')/gs, '')
    }

    writeFileSync(match.absolute, contents, {
      encoding: 'utf-8'
    })

    exec('code ' + match.absolute)
  })
  globber.on('error', (err) => {
    console.error('fatal error', err)
  })
  globber.on('end', (m) => {
    console.log('done')
  })
}

init()
