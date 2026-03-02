import { defineAddon, defineAddonOptions } from 'sv'

const dimforgeVersion = '^0.16.2'
const theatreVersion = '^0.7.2'
const webxrTypesVersion = '^0.5.14'

const packages = [
  {
    id: 'extras',
    package: '@threlte/extras',
    version: '@latest',
    description: 'Components, helpers, hooks and more'
  },
  {
    id: 'rapier',
    package: '@threlte/rapier',
    version: '@latest',
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
    version: '@latest',
    description: 'Animation library',
    dependencies: [{ package: '@theatre/core', version: theatreVersion }]
  },
  {
    id: 'xr',
    package: '@threlte/xr',
    version: '@latest',
    description: 'VR and AR support'
  },
  {
    id: 'flex',
    package: '@threlte/flex',
    version: '@latest',
    description: 'Flexbox for 3D'
  },
  {
    id: 'studio',
    package: '@threlte/studio',
    version: '@latest',
    description: 'Visual editor'
  }
]

const options = defineAddonOptions()
  .add('types', {
    type: 'boolean',
    question: 'Would you like the types for autocompletion & hints?',
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
    sv.dependency('three', '@latest')
    if (options.types) {
      sv.devDependency('@types/three', '@latest')
    }
    sv.dependency('@threlte/core', '@latest')

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

      if (pkgId === 'xr' && options.types) {
        sv.devDependency('@types/webxr', webxrTypesVersion)
      }
    }
  }
})
