import { defineAddon, defineAddonOptions } from 'sv'

const versionTag = 'latest'
const dimforgeVersion = '^0.16.2'
const theatreVersion = '^0.7.2'
const webxrTypesVersion = '^0.5.14'

const packages = [
  {
    id: 'extras',
    package: '@threlte/extras',
    version: versionTag,
    description: 'Components, helpers, hooks and more'
  },
  {
    id: 'rapier',
    package: '@threlte/rapier',
    version: versionTag,
    description: 'Physics engine',
    dependencies: [
      {
        package: '@dimforge/rapier3d-compat',
        version: dimforgeVersion
      }
    ]
  },
  {
    id: 'theatre',
    package: '@threlte/theatre',
    version: versionTag,
    description: 'Animation library',
    dependencies: [{ package: '@theatre/core', version: theatreVersion }]
  },
  {
    id: 'xr',
    package: '@threlte/xr',
    version: versionTag,
    description: 'VR and AR support'
  },
  {
    id: 'flex',
    package: '@threlte/flex',
    version: versionTag,
    description: 'Flexbox for 3D'
  },
  {
    id: 'studio',
    package: '@threlte/studio',
    version: versionTag,
    description: 'Visual editor'
  }
]

const options = defineAddonOptions()
  .add('types', {
    type: 'boolean',
    question: 'Add types for autocompletion and hints?',
    default: true
  })
  .add('packages', {
    type: 'multiselect',
    question:
      'Which Threlte packages would you like to add? (core and three.js are included by default)',
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
    sv.dependency('three', versionTag)
    if (options.types) {
      sv.devDependency('@types/three', versionTag)
    }
    sv.dependency('@threlte/core', versionTag)

    for (const pkgId of options.packages) {
      const pkg = packages.find((p) => p.id === pkgId)
      if (!pkg) continue

      sv.dependency(pkg.package, pkg.version)

      if (pkg.dependencies) {
        for (const dep of pkg.dependencies) {
          sv.dependency(dep.package, dep.version)
        }
      }

      if (pkgId === 'xr' && options.types) {
        sv.devDependency('@types/webxr', webxrTypesVersion)
      }
    }
  }
})
