export function generateRandomNumbers() {
  const output = []
  for (let i = 0; i < 100; i++) {
    output.push(Math.random())
  }
  return output
}
