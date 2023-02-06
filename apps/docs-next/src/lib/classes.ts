export const c = (...args: (string | boolean)[]) => {
  return args.filter(Boolean).join(' ')
}
