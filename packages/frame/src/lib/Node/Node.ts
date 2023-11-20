type VertexWithEdges<T> = { value: T; previous: Set<T>; next: Set<T> }

class DAG<T> {
  private vertices: Array<VertexWithEdges<T>> = []
  protected sorted: T[] = []
  constructor() {}

  protected add(
    value: T,
    options?: {
      before?: T
      after?: T
    }
  ) {
    const vertex: VertexWithEdges<T> = {
      value,
      previous: new Set(),
      next: new Set()
    }
    if (options?.before) {
      const nextVertex = this.vertices.find(({ value }) => value === options.before)
      if (!nextVertex) {
        throw new Error('next vertex not found')
      }
      nextVertex.previous.add(value)
      vertex.next.add(nextVertex.value)
    }
    if (options?.after) {
      const previousVertex = this.vertices.find(({ value }) => value === options.after)
      if (!previousVertex) {
        throw new Error('previous vertex not found')
      }
      previousVertex.next.add(value)
      vertex.previous.add(previousVertex.value)
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

type Handler = (...args: any[]) => void

/**
 * A Node is a stage in a graph. It can have handlers that are run when the
 * graph is run. The handlers of a stage are run in an arbitrary order.
 */
export class Node {
  private handlers: Set<Handler> = new Set()

  constructor(handlers?: Handler[]) {
    if (handlers) {
      handlers.forEach((handler) => this.addHandler(handler))
    }
  }

  public addHandler(handler: Handler) {
    this.handlers.add(handler)
  }

  public removeHandler(handler: Handler) {
    this.handlers.delete(handler)
  }

  run(...args: any[]) {
    this.handlers.forEach((handler) => handler(...args))
  }
}

type NodeWithEdges = { node: Node; previousNodes: Set<Node>; nextNodes: Set<Node> }

/**
 * A Graph is a collection of nodes. The nodes are run in a topological sort
 * order.
 */
export class Graph {
  private callback: (delta: number, run: () => void) => void
  private _nodes: Array<NodeWithEdges> = []
  private sorted: Node[] = []

  constructor(callback: (delta: number, run: () => void) => void) {
    this.callback = callback.bind(this)
  }
  public addNode(
    node: Node,
    options?: {
      before?: Node
      after?: Node
    }
  ) {
    const graphNode: NodeWithEdges = {
      node,
      previousNodes: new Set(),
      nextNodes: new Set()
    }
    if (options?.before) {
      const nextNode = this._nodes.find(({ node }) => node === options.before)
      if (!nextNode) {
        throw new Error('next node not found')
      }
      nextNode.previousNodes.add(node)
      graphNode.nextNodes.add(nextNode.node)
    }
    if (options?.after) {
      const prevNode = this._nodes.find(({ node }) => node === options.after)
      if (!prevNode) {
        throw new Error('previous node not found')
      }
      prevNode.nextNodes.add(node)
      graphNode.previousNodes.add(prevNode.node)
    }
    this._nodes.push(graphNode)
    this.sort()
  }

  public removeNode(node: Node) {
    const index = this._nodes.findIndex(({ node: n }) => n === node)
    if (index === -1) return
    const graphNode = this._nodes[index]
    graphNode.previousNodes.forEach((prevNode) => {
      const gn = this._nodes.find(({ node }) => node === prevNode)
      gn?.nextNodes.delete(node)
    })
    graphNode.nextNodes.forEach((nextNode) => {
      const gn = this._nodes.find(({ node }) => node === nextNode)
      gn?.previousNodes.delete(node)
    })
    this._nodes.splice(index, 1)
    this.sort()
  }

  private sort() {
    const inDegree: Map<Node, number> = new Map()
    const zeroInDegreeQueue: Node[] = []
    const result: Node[] = []

    // Initialize inDegree (count of incoming edges) for each node
    this._nodes.forEach((graphNode) => {
      inDegree.set(graphNode.node, 0)
    })

    // Calculate inDegree for each node
    this._nodes.forEach((graphNode) => {
      graphNode.nextNodes.forEach((nextNode) => {
        inDegree.set(nextNode, (inDegree.get(nextNode) || 0) + 1)
      })
    })

    // Enqueue nodes with inDegree 0
    inDegree.forEach((degree, node) => {
      if (degree === 0) {
        zeroInDegreeQueue.push(node)
      }
    })

    // Process nodes with inDegree 0 and decrease inDegree of adjacent nodes
    while (zeroInDegreeQueue.length) {
      const node = zeroInDegreeQueue.shift()!
      result.push(node)

      this._nodes
        .find(({ node: n }) => n === node)
        ?.nextNodes.forEach((adjNode) => {
          const adjNodeInDegree = (inDegree.get(adjNode) || 0) - 1
          inDegree.set(adjNode, adjNodeInDegree)
          if (adjNodeInDegree === 0) {
            zeroInDegreeQueue.push(adjNode)
          }
        })
    }

    // Check for cycles in the graph
    if (result.length !== this._nodes.length) {
      throw new Error('The graph contains a cycle, and thus can not be sorted topologically.')
    }

    this.sorted = result
  }

  public runNodes(delta: number) {
    this.callback(delta, () => this.sorted.forEach((node) => node.run()))
  }
}

/**
 * The runner is responsible for running the graphs. It runs the graphs in a
 * requestAnimationFrame loop.
 */
export class Runner {
  private _graphs: Array<NodeWithEdges> = []

  private sorted: Node[] = []

  graphs: Set<Graph> = new Set()
  animationFrameHandle?: number
  lastTime = 0

  constructor() {}

  addGraph(
    graph: Graph,
    options?: {
      before?: Node
      after?: Node
    }
  ) {
    this.graphs.add(graph)
  }

  removeGraph(graph: Graph) {
    this.graphs.delete(graph)
  }

  start() {
    this.animationFrameHandle = window.requestAnimationFrame(this.runGraphs.bind(this))
  }

  stop() {
    if (this.animationFrameHandle) window.cancelAnimationFrame(this.animationFrameHandle)
  }

  runGraphs(time: DOMHighResTimeStamp) {
    const delta = time - this.lastTime
    this.graphs.forEach((graph) => {
      graph.runNodes(delta)
    })
    this.lastTime = time
    this.animationFrameHandle = window.requestAnimationFrame(this.runGraphs.bind(this))
  }
}

export const init = () => {
  const runner = new Runner()

  // the default frame loop always runs
  const frameloop = new Graph((delta, run) => {
    run()
  })

  const defaultNode = new Node()
  const renderNode = new Node()
  const beforeDefaultNode = new Node()
  const beforeRenderAndAfterDefaultNode = new Node()

  frameloop.addNode(defaultNode)
  frameloop.addNode(renderNode, {
    after: defaultNode
  })
  frameloop.addNode(beforeDefaultNode, {
    before: defaultNode
  })
  frameloop.addNode(beforeRenderAndAfterDefaultNode, {
    before: renderNode,
    after: defaultNode
  })

  // renderNode.addHandler(() => {
  //   console.log('renderNode')
  // })
  // defaultNode.addHandler(() => {
  //   console.log('defaultNode')
  // })
  // beforeDefaultNode.addHandler(() => {
  //   console.log('beforeDefaultNode')
  // })
  // beforeRenderAndAfterDefaultNode.addHandler(() => {
  //   console.log('beforeRenderAndAfterDefaultNode')
  // })

  let rate = 1 / 2
  let fixedStepTimeAccumulator = 0
  const physicsLoop = new Graph((delta, run) => {
    fixedStepTimeAccumulator += delta / 1000

    while (fixedStepTimeAccumulator >= rate) {
      fixedStepTimeAccumulator -= rate
      run()
    }
  })

  const physicsNode = new Node()
  physicsLoop.addNode(physicsNode)
  physicsNode.addHandler(() => {
    console.log('physics')
  })

  const afterPhysicsNode = new Node()
  physicsLoop.addNode(afterPhysicsNode, {
    after: physicsNode
  })
  afterPhysicsNode.addHandler(() => {
    console.log('afterPhysics')
  })

  // runner.addGraph(fixedLoop)

  runner.addGraph(physicsLoop)
  runner.addGraph(frameloop)
  runner.start()

  setTimeout(() => {
    runner.stop()
  }, 100000)
}
