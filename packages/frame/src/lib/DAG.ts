type Vertex<T> = { value: T; previous: Set<T>; next: Set<T> }

export type AddNodeOptions<T> = {
  before?: T | T[]
  after?: T | T[]
}

export class DAG<T> {
  private vertices: Array<Vertex<T>> = []
  protected sorted: T[] = []

  constructor() {}

  private getVertex(value: T) {
    return this.vertices.find(({ value: v }) => v === value)
  }

  private addBefore(vertex: Vertex<T>, before: T) {
    const nextVertex = this.getVertex(before)
    if (!nextVertex) {
      throw new Error('next vertex not found')
    }
    nextVertex.previous.add(vertex.value)
    vertex.next.add(nextVertex.value)
  }

  private addAfter(vertex: Vertex<T>, after: T) {
    const previousVertex = this.vertices.find(({ value }) => value === after)
    if (!previousVertex) {
      throw new Error('previous vertex not found')
    }
    previousVertex.next.add(vertex.value)
    vertex.previous.add(previousVertex.value)
  }

  protected add(value: T, options?: AddNodeOptions<T>) {
    const vertex: Vertex<T> = {
      value,
      previous: new Set(),
      next: new Set()
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
    this.vertices.push(vertex)
    this.sort()
  }

  protected remove(value: T) {
    const index = this.vertices.findIndex(({ value: v }) => v === value)
    if (index === -1) return
    const vertex = this.vertices[index]
    vertex.previous.forEach((prev) => {
      this.vertices.find(({ value }) => value === prev)?.next.delete(value)
    })
    vertex.next.forEach((next) => {
      this.vertices.find(({ value }) => value === next)?.previous.delete(value)
    })
    this.vertices.splice(index, 1)
    this.sort()
  }

  private sort() {
    const inDegree: Map<T, number> = new Map()
    const zeroInDegreeQueue: T[] = []
    const result: T[] = []

    // Initialize inDegree (count of incoming edges) for each vertex
    this.vertices.forEach((vertex) => {
      inDegree.set(vertex.value, 0)
    })

    // Calculate inDegree for each vertex
    this.vertices.forEach((vertex) => {
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

      this.vertices
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
    if (result.length !== this.vertices.length) {
      throw new Error('The graph contains a cycle, and thus can not be sorted topologically.')
    }

    this.sorted = result
  }
}
