export const monkeypatchRequestAnimationFrame = () => {
  let cbs: FrameRequestCallback[] = []

  window.requestAnimationFrame = (callback: FrameRequestCallback) => {
    cbs.push(callback)
    return 0
  }

  let time = 0
  const advance = (ms: number) => {
    time += ms
    const tmp = [...cbs]
    cbs = []
    tmp.forEach((cb) => cb(time))
  }

  return {
    advance
  }
}
