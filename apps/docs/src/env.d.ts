/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

declare module '*.glb' {
  const src: string
  export default src
}
