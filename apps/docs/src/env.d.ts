/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// make ?url imports always a string
declare module '*?url' {
  const value: string
  export default value
}
