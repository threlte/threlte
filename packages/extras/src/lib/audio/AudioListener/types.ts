import type { Props } from '@threlte/core'
import type { AudioListener as ThreeAudioListener } from 'three'

export type AudioListenerProps = Props<ThreeAudioListener> & {
  id?: string
  masterVolume?: number
  /**
   * When `true`, automatically call `context.resume()` on the first user
   * gesture (`click`, `keydown`, `touchstart`, `pointerdown`) on `window`.
   * Browsers block audio playback until a user has interacted with the page;
   * this prop handles the unlock for you so game-driven playback (physics
   * events, timers, keyboard/gamepad input) can make sound without manual
   * wiring. Listeners are removed as soon as the context resumes.
   *
   * Default: `false`. Leave off if all your playback is triggered from
   * explicit click handlers that already `await context.resume()`.
   */
  autoResume?: boolean
}
