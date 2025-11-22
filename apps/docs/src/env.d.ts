/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { InteractivityProps } from '@threlte/extras'

// make ?url imports always a string
declare module '*?url' {
  const value: string
  export default value
}

declare global {
  namespace Threlte {
    interface UserProps extends InteractivityProps {}
  }
}
