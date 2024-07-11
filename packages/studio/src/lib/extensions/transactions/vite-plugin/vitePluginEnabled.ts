// the vite plugin adds a globally defined `__THRELTE_STUDIO_PLUGIN_ENABLED__` variable
export const vitePluginEnabled =
  typeof window !== 'undefined' &&
  typeof (window as any).__THRELTE_STUDIO_PLUGIN_ENABLED__ !== 'undefined'
