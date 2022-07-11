import { readFileSync, writeFileSync } from 'fs'

/**
 * This script cleans up the package to not include
 * a .publishConfig property and to set the proper exports
 */
const cleanPackage = () => {
  const packagedJson = JSON.parse(
    readFileSync('./package/package.json', {
      encoding: 'utf-8'
    })
  )
  const originalJson = JSON.parse(
    readFileSync('./package.json', {
      encoding: 'utf-8'
    })
  )

  delete packagedJson.publishConfig
  delete packagedJson.main
  packagedJson.exports = originalJson.publishConfig.exports

  writeFileSync('./package/package.json', JSON.stringify(packagedJson, null, 2), {
    encoding: 'utf-8'
  })
}

cleanPackage()
