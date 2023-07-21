import { generateUUID } from 'three/src/math/MathUtils'
import { clippyStores } from './clippyStores'
import { get } from 'svelte/store'

const { clippyHistory } = clippyStores

export const initHistory = () => {
  //
}

export const loadHistoryMeta = () => {
  const history = localStorage.getItem('_clippyHistoryMeta')
  if (history) {
    const parsedHistory = JSON.parse(history)
    clippyHistory.set(parsedHistory)
  } else {
    clippyHistory.set([])
  }
}

export const loadHistoryAnswer = (id: string) => {
  const answer = localStorage.getItem(`clippyAnswer_${id}`)
  return answer
}

export const saveClippyAnswerToHistory = (question: string, answer: string, answerFound = true) => {
  //
  const answerUuid = generateUUID()
  const historyEntry: IClippyHistoryMetaEntry = {
    timestamp: Date.now(),
    question,
    answerUuid,
    answerFound
  }

  const currentMeta = get(clippyHistory)
  currentMeta.push(historyEntry)

  localStorage.setItem(`clippyAnswer_${answerUuid}`, answer)
  localStorage.setItem(`_clippyHistoryMeta`, JSON.stringify(currentMeta))

  loadHistoryMeta()
}

export interface IClippyHistoryMetaEntry {
  timestamp: number
  question: string
  answerUuid: string
  answerFound: boolean
}
