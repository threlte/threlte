export const files = {
  'package.json': `{
  "name": "vite-svelte-ts-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json"
  },
  "devDependencies": {
    "@dimforge/rapier3d-compat": "*",
    "@sveltejs/vite-plugin-svelte": "*",
    "@theatre/core": "*",
    "@theatre/studio": "*",
    "@threlte/core": "next",
    "@threlte/extras": "next",
    "@threlte/rapier": "next",
    "@threlte/theatre": "next",
    "@tsconfig/svelte": "*",
    "@types/three": "*",
    "postprocessing": "*",
    "svelte": "*",
    "svelte-check": "*",
    "three": "*",
    "tslib": "*",
    "typescript": "*",
    "vite": "*"
  }
}
`,
  'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Svelte + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
  'src/Layout.svelte': `<script>
  import App from './example/App.svelte'
</script>

<div>
  <App />
</div>

<style>
  :global(body, html) {
    margin: 0;
  }

  div {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
`,
  'src/main.ts': `import App from './Layout.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app
`,
  'src/vite-env.d.ts': `/// <reference types="svelte" />
/// <reference types="vite/client" />
`,
  'svelte.config.js': `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: [vitePreprocess()]
}
`,
  'tsconfig.json': `{
  "extends": "@tsconfig/svelte/tsconfig.json",
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "isolatedModules": true
  },
  "include": ["src/**/*.d.ts", "src/**/*.ts", "src/**/*.js", "src/**/*.svelte"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`,
  'tsconfig.node.json': `{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node"
  },
  "include": ["vite.config.ts"]
}
`,
  'vite.config.ts': `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
})
`
}
