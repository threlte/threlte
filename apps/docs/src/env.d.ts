/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

// make ?url imports always a string
declare module '*?url' {
  const value: string
  export default value
}
