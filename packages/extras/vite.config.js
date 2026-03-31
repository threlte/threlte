import { resolve } from 'path'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  plugins: [mode === 'test' ? svelte() : sveltekit(), { ...threeMinifier(), enforce: 'pre' }],
  resolve: {
    conditions: mode === 'test' ? ['browser'] : undefined
  },
  ...(mode === 'test' && {
    optimizeDeps: {
      exclude: ['@threlte/core', '@threlte/extras', '@threlte/test'],
      entries: ['src/lib/interactivity/__tests__/**/*.spec.ts'],
      include: [
        'three',
        'three-mesh-bvh',
        'three/examples/jsm/controls/OrbitControls.js',
        'three/examples/jsm/controls/TrackballControls.js',
        'three/examples/jsm/controls/TransformControls.js',
        'three/examples/jsm/effects/AsciiEffect.js',
        'three/examples/jsm/geometries/DecalGeometry.js',
        'three/examples/jsm/geometries/TextGeometry.js',
        'three/examples/jsm/loaders/DRACOLoader.js',
        'three/examples/jsm/loaders/EXRLoader.js',
        'three/examples/jsm/loaders/FontLoader.js',
        'three/examples/jsm/loaders/GLTFLoader.js',
        'three/examples/jsm/loaders/HDRCubeTextureLoader.js',
        'three/examples/jsm/loaders/KTX2Loader.js',
        'three/examples/jsm/loaders/RGBELoader.js',
        'three/examples/jsm/loaders/SVGLoader.js',
        'three/examples/jsm/libs/meshopt_decoder.module.js',
        'three/examples/jsm/objects/GroundedSkybox.js',
        'three/examples/jsm/objects/Sky.js',
        'three/examples/jsm/shaders/HorizontalBlurShader.js',
        'three/examples/jsm/shaders/VerticalBlurShader.js',
        'three/examples/jsm/utils/BufferGeometryUtils.js',
        'three/examples/jsm/csm/CSM.js',
        'camera-controls',
        'three-viewport-gizmo',
        'three-perf',
        'troika-three-text',
        '@threejs-kit/instanced-sprite-mesh',
        'mitt',
      ]
    }
  }),
  test: {
    include: ['**/*.{test,spec}.ts', '**/*.{test,spec}.svelte.ts'],
    coverage: { include: ['src'] },
    mockReset: true,
    unstubGlobals: true,
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }]
    }
  }
}))
