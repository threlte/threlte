import { cachedFetch } from './util-server'

export interface Contributor {
  login: string
  id: number
  contributions: number
  avatar_url?: string
}

interface Commit {
  author: {
    login: string
    id: number
  }
  commit: {
    message: string
  }
}

const printError = (e: Error) =>
  console.warn(`[error]  /src/util/getContributors.ts\n         ${e?.message ?? e}`)

async function recursiveFetch(endpoint: string, page = 1) {
  try {
    const queryParam = endpoint.includes('?') ? '&' : '?'
    const pageSize = 100
    const url = `https://api.github.com/${endpoint}${queryParam}per_page=${pageSize}&page=${page}`

    const token = import.meta.env.PUBLIC_GITHUB_TOKEN

    const res = await cachedFetch(
      url,
      {
        method: 'GET',
        headers: {
          Authorization: token && `Basic ${Buffer.from(token, 'binary').toString('base64')}`,
          'User-Agent': 'astro-docs/1.0'
        }
      },
      { duration: '15m' }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(
        `Request to fetch endpoint failed. Reason: ${res.statusText}
         Message: ${data?.message}`
      )
    }

    // Fetch more data recursively if there are more than GitHub’s per-page response limit.
    if (data.length === pageSize) {
      const rest = await recursiveFetch(endpoint, page + 1)
      data.push(...rest)
    }

    return data
  } catch (e) {
    printError(e as Error)
    return []
  }
}

export async function getAllContributors(repo: string) {
  const endpoint = `repos/${repo}/contributors`
  const contributors: Contributor[] = await recursiveFetch(endpoint)

  return contributors
}

export async function getTranslationContributors(paths: string[], repo: string) {
  const ignoredCommitKeywords = /(en-only|typo|broken link|i18nReady|i18nIgnore)/i
  const contributors: Contributor[] = []

  for (const path of paths) {
    const endpoint = `repos/${repo}/commits?path=${path}`
    const commits: Commit[] = await recursiveFetch(endpoint)

    for (const { author, commit } of commits) {
      if (ignoredCommitKeywords.test(commit.message) || !author) continue
      const contributor = contributors.find((contributor) => contributor.id === author.id)

      if (!contributor) {
        contributors.push({
          id: author.id,
          login: author.login,
          contributions: 1
        })
        continue
      }
      contributor.contributions += 1
    }
  }

  return contributors.sort((a, b) => b.contributions - a.contributions)
}
