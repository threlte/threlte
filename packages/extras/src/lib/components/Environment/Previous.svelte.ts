export class Previous<T> {
  #previous: T | undefined = $state()
  #current?: T

  constructor(getter: () => T) {
    $effect(() => {
      this.#previous = this.#current
      this.#current = getter()
    })
  }

  get current(): T | undefined {
    return this.#previous
  }
}
