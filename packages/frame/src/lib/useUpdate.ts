import { Node } from './Stage/Stage'

const physicsStage = new Node()

type StageOptions = {
  stage: Node
}

type ImplicitStageOptions = {
  before?: Node
  after?: Node
  stage: never
}

type Options =
  | {
      stage: Node
    }
  | (
      | {
          before: Node
        }
      | {
          after: Node
        }
      | {
          before: Node
          after: Node
        }
    )

export const onUpdate = (callback: () => void, options: Options) => {}

onUpdate(() => {}, {
  stage: physicsStage
})
