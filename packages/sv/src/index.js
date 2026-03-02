import { defineAddon, defineAddonOptions } from 'sv'
import corePackage from '../../core/package.json' with { type: 'json' }
import extrasPackage from '../../extras/package.json' with { type: 'json' }
import flexPackage from '../../flex/package.json' with { type: 'json' }
import rapierPackage from '../../rapier/package.json' with { type: 'json' }
import studioPackage from '../../studio/package.json' with { type: 'json' }
import theatrePackage from '../../theatre/package.json' with { type: 'json' }
import xrPackage from '../../xr/package.json' with { type: 'json' }

console.log('check this is actaully a version:', corePackage.version)
// import {  } from "../../../pnpm-workspace.yaml";

const packages = [
  {
    id: 'extras',
    package: '@threlte/extras',
    version: extrasPackage.version,
    description: 'Components, helpers, hooks and more'
  },
  {
    id: 'rapier',
    package: '@threlte/rapier',
    version: rapierPackage.version,
    description: 'Physics engine',
    dependencies: [
      {
        package: '@dimforge/rapier3d-compat',
        version: rapierPackage.devDependencies['@dimforge/rapier3d-compat']
      }
    ]
  },
  {
    id: 'theatre',
    package: '@threlte/theatre',
    version: theatrePackage.version,
    description: 'Animation library',
    dependencies: [
      { package: '@theatre/core', version: theatrePackage.peerDependencies['@theatre/studio'] }
    ]
  },
  {
    id: 'xr',
    package: '@threlte/xr',
    version: xrPackage.version,
    description: 'VR and AR support'
  },
  {
    id: 'flex',
    package: '@threlte/flex',
    version: flexPackage.version,
    description: 'Flexbox for 3D'
  },
  {
    id: 'studio',
    package: '@threlte/studio',
    version: studioPackage.version,
    description: 'Visual editor'
  }
]

const options = defineAddonOptions()
  .add('packages', {
    type: 'multiselect',
    question: 'Which Threlte packages would you like to add?',
    options: packages.map((p) => ({
      value: p.id,
      label: p.package,
      hint: p.description
    })),
    default: [],
    required: false
  })
  .build()

export default defineAddon({
  id: 'Threlte',
  shortDescription: '3D rendering framework',
  homepage: 'https://threlte.xyz',
  options,
  run: ({ sv, options }) => {
    sv.dependency('three', corePackage.devDependencies.three)
    sv.devDependency('@types/three', corePackage.devDependencies.three)
    sv.dependency('@threlte/core', corePackage.version)

    for (const pkgId of options.packages) {
      const pkg = packages.find((p) => p.id === pkgId)
      if (!pkg) continue

      const version = pkg.version

      sv.dependency(pkg.package, version)

      if (pkg.dependencies) {
        for (const dep of pkg.dependencies) {
          sv.dependency(dep.package, dep.version)
        }
      }

      if (pkgId === 'xr') {
        sv.devDependency('@types/webxr', '^0.5.14')
      }
    }
  }
})
