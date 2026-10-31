import type { Props } from '@threlte/core'
import type { AudioListener as ThreeAudioListener } from 'three'

export interface AudioListenerProps extends Props<ThreeAudioListener> {
  /**
   * Registers the listener under this id. `<Audio>` and `<PositionalAudio>`
   * attach to the listener with the matching `id`, so use one per listener
   * when a scene has several.
   * @default 'default'
   */
  id?: string

  /**
   * The overall volume of everything played through this listener, where `1`
   * is unchanged. Leaves three's default untouched when not set.
   */
  masterVolume?: number

  /**
   * Resumes the audio context on the first user gesture (`click`, `keydown`,
   * `touchstart` or `pointerdown` on `window`). Browsers block audio until the
   * user interacts with the page, so this lets playback started by game logic
   * (physics events, timers, gamepad input) make sound without wiring up the
   * unlock yourself. The gesture listeners are removed once the context
   * resumes. Leave it off if all playback starts from click handlers that
   * already `await context.resume()`.
   * @default false
   */
  autoResume?: boolean
}
