import { readFileSync, writeFileSync } from 'fs'

/**
 * This script cleans up the package to not include
 * a .publishConfig property and to set the proper exports
 */
const cleanPackage = () => {
  const packageJson = JSON.parse(
    readFileSync('./package.json', {
      encoding: 'utf-8'
    })
  )

  packageJson.exports = packageJson.publishConfig.exports
  packageJson.types = packageJson.publishConfig.types

  delete packageJson.publishConfig

  writeFileSync('./package.json', JSON.stringify(packageJson, null, 2), {
    encoding: 'utf-8'
  })
}

cleanPackage()
