/**
 * ### `onSuspend`
 *
 * This hook is used to trigger a callback when the component is suspended. It
 * works within the boundaries of the <Suspense> component. If there is no
 * <Suspense> component, the callback will not be executed, as the component
 * will never suspend.
 *
 * @param {() => void} callback - The function to be executed when the component
 * is suspended.
 */
export const onSuspend = (callback: () => void): void => {
  $effect.pre(() => {
    if ($effect.pending() > 0) {
      callback()
    }
  })
}
