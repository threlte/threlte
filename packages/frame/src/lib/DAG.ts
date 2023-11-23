type Vertex<T> = { value: T; previous: Set<T>; next: Set<T> }

export type AddNodeOptions<T> = {
  before?: T | T[]
  after?: T | T[]
}

export class DAG<T> {
  private unlinked: Vertex<T>[] = []
  private linked: Vertex<T>[] = []
  private sortedLinked: T[] = []
  private needsSort = false

  protected add(value: T, options?: AddNodeOptions<T>) {
    const vertex: Vertex<T> = {
      value,
      previous: new Set(),
      next: new Set()
    }
    if (!options?.after && !options?.before) {
      this.unlinked.push(vertex)
      return
    }
    if (options?.before) {
      const beforeArr = Array.isArray(options.before) ? options.before : [options.before]
      beforeArr.forEach((before) => {
        this.addBefore(vertex, before)
      })
    }
    if (options?.after) {
      const afterArr = Array.isArray(options.after) ? options.after : [options.after]
      afterArr.forEach((after) => {
        this.addAfter(vertex, after)
      })
    }
    this.linked.push(vertex)
    this.needsSort = true
  }

  protected remove(value: T) {
    const index = this.linked.findIndex(({ value: v }) => v === value)
    if (index === -1) {
      const unlinkedIndex = this.unlinked.findIndex(({ value: v }) => v === value)
      if (unlinkedIndex !== -1) {
        this.unlinked.splice(unlinkedIndex, 1)
        return
      }
      throw new Error('Vertex not found')
    }
    const vertex = this.linked[index]
    vertex.previous.forEach((prev) => {
      this.linked.find(({ value }) => value === prev)?.next.delete(value)
    })
    vertex.next.forEach((next) => {
      this.linked.find(({ value }) => value === next)?.previous.delete(value)
    })
    this.linked.splice(index, 1)
    this.needsSort = true
  }

  protected mapNodes<U>(callback: (value: T, index: number) => U): U[] {
    if (this.needsSort) {
      this.sort()
    }
    const result: U[] = []
    for (let i = 0; i < this.sortedLinked.length; i++) {
      result.push(callback(this.sortedLinked[i], i))
    }
    for (let i = 0; i < this.unlinked.length; i++) {
      result.push(callback(this.unlinked[i].value, i))
    }
    return result
  }

  protected forEachNode(callback: (value: T, index: number) => void) {
    if (this.needsSort) {
      this.sort()
    }
    for (let i = 0; i < this.sortedLinked.length; i++) {
      callback(this.sortedLinked[i], i)
    }
    for (let i = 0; i < this.unlinked.length; i++) {
      callback(this.unlinked[i].value, i)
    }
  }

  private addBefore(vertex: Vertex<T>, before: T) {
    let nextVertex = this.linked.find(({ value: v }) => v === before)
    if (!nextVertex) {
      // is it maybe unlinked?
      const unlinkedIndex = this.unlinked.findIndex(({ value }) => value === before)
      if (unlinkedIndex !== -1) {
        // yes, it is
        nextVertex = this.unlinked[unlinkedIndex]
        this.unlinked.splice(unlinkedIndex, 1)
        this.linked.push(nextVertex)
      } else {
        // no, it's not
        throw new Error('Next vertex not found')
      }
    }
    nextVertex.previous.add(vertex.value)
    vertex.next.add(nextVertex.value)
  }

  private addAfter(vertex: Vertex<T>, after: T) {
    let previousVertex = this.linked.find(({ value }) => value === after)
    if (!previousVertex) {
      // is it maybe unlinked?
      const unlinkedIndex = this.unlinked.findIndex(({ value }) => value === after)
      if (unlinkedIndex !== -1) {
        // yes, it is
        previousVertex = this.unlinked[unlinkedIndex]
        this.unlinked.splice(unlinkedIndex, 1)
        this.linked.push(previousVertex)
      } else {
        // no, it's not
        throw new Error('Previous vertex not found')
      }
    }
    previousVertex.next.add(vertex.value)
    vertex.previous.add(previousVertex.value)
  }

  private sort() {
    const inDegree: Map<T, number> = new Map()
    const zeroInDegreeQueue: T[] = []
    const result: T[] = []

    // Initialize inDegree (count of incoming edges) for each vertex
    this.linked.forEach((vertex) => {
      inDegree.set(vertex.value, 0)
    })

    // Calculate inDegree for each vertex
    this.linked.forEach((vertex) => {
      vertex.next.forEach((next) => {
        inDegree.set(next, (inDegree.get(next) || 0) + 1)
      })
    })

    // Enqueue vertices with inDegree 0
    inDegree.forEach((degree, value) => {
      if (degree === 0) {
        zeroInDegreeQueue.push(value)
      }
    })

    // Process vertices with inDegree 0 and decrease inDegree of adjacent vertices
    while (zeroInDegreeQueue.length) {
      const vertex = zeroInDegreeQueue.shift()!
      result.push(vertex)

      this.linked
        .find(({ value: v }) => v === vertex)
        ?.next.forEach((adjVertex) => {
          const adjVertexInDegree = (inDegree.get(adjVertex) || 0) - 1
          inDegree.set(adjVertex, adjVertexInDegree)
          if (adjVertexInDegree === 0) {
            zeroInDegreeQueue.push(adjVertex)
          }
        })
    }

    // Check for cycles in the graph
    if (result.length !== this.linked.length) {
      throw new Error('The graph contains a cycle, and thus can not be sorted topologically.')
    }

    this.sortedLinked = result
    this.needsSort = false
  }
}
