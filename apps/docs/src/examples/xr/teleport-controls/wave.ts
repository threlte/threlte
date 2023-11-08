/**
 * 
 * @param time The time at which you want to calculate the wave point.
 * @param amplitude The amplitude of the wave.
 * @param frequency The frequency of the wave.
 * @param phase The phase of the wave.
 * @param numberOfSines The number of sines to sum.
 * @returns 
 */
export function generateWavePoint(
  time: number,
  amplitude = 1,
  frequency = 1,
  phase = 0,
  numberOfSines = 10
): number {
  let wavePoint = 0;
  for (let i = 0; i < numberOfSines; i++) {
    const randomPhase = Math.random() * 2 * Math.PI;
    wavePoint +=
      amplitude *
      Math.sin(frequency * i + phase + randomPhase) *
      Math.sin(frequency * time);
  }
  return wavePoint;
}