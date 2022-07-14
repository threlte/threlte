---
'@threlte/core': major
'@threlte/extras': major
---

# Breaking Change

The threlte repository has been moved to its own GitHub Organization: [https://github.com/threlte/threlte](https://github.com/threlte/threlte).
threlte consists now of two npm packages: `@threlte/core` and `@threlte/extras`, managed in a mono repository:

`@threlte/core` consists of components, hooks and other utilites that follow three.js principles, nomenclature and inheritance as closely as useful and possible. Therefore components that have been part of the package `threlte` have been moved to the new home of all kinds of useful abstractons: `@threlte/extras`.

`@threlte/extras` consists of useful abstractions and helpers that you may find yourself use all the time. These components do not need to follow three.js principles as strict as exports from `@threlte/core`, but they do where it makes sense.

## The breaking changes in detail:

- Moved `<GLTF>` component as well as `useGltf` hook to `@threlte/extras`.
- Moved `<Text>` component to `@threlte/extras`.

## How to update

Replace imports from `threlte` and `threlte/extras`:

1. `npm rm threlte`
2. `npm i -D @threlte/core @threlte/extras`
3. Replace `import {…} from 'threlte'` with `import {…} from '@threlte/core'`
4. Replace `import {…} from 'threlte/extras'` with `import {…} from '@threlte/extras'`

Specifically replace imports of `<GLTF>`, `useGltf` or `<Text>`:

3. Replace `import { GLTF, useGltf, Text } from 'threlte'` with `import { GLTF, useGltf, Text } from '@threlte/extras'`

# Other changes

- The documentation is now hosted on Vercel and as such we are hoping for a Vercel Sponsorship for OSS. There have also been some style fixes and overhauls.
