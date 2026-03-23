import { readFileSync, writeFileSync } from 'fs'

/**
 * This script utilizes a property called "publishOverrides" in the package.json
 * to override specific properties in the package.json when publishing to npm.
 */
const cleanPackage = () => {
  let packageJson = JSON.parse(
    readFileSync('./package.json', {
      encoding: 'utf-8'
    })
  )

  packageJson = {
    ...packageJson,
    ...packageJson.publishOverrides
  }

  delete packageJson.publishOverrides

  writeFileSync('./package.json', JSON.stringify(packageJson, null, 2), {
    encoding: 'utf-8'
  })
}

cleanPackage()
