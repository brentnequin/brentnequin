import { expect, test, type Page } from '@playwright/test'

async function holdRecommendations(page: Page) {
  let releaseResponse!: () => void
  const responseGate = new Promise<void>((resolve) => {
    releaseResponse = resolve
  })

  let markRequestStarted!: () => void
  const requestStarted = new Promise<void>((resolve) => {
    markRequestStarted = resolve
  })

  await page.route('**/api/movie-recommendations**', async (route) => {
    markRequestStarted()
    await responseGate
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        page: 1,
        per_page: 8,
        total: 1,
        items: [
          {
            isWatched: false,
            voteCount: 0,
            hasVoted: false,
            movie: {
              tmdbId: 123,
              title: 'Slow test recommendation',
              posterPath: null,
              releaseDate: '2024-01-01',
              description: null,
            },
          },
        ],
      }),
    })
  })

  return { requestStarted, releaseResponse: () => releaseResponse() }
}

test('shows poster skeletons while recommendations are loading', async ({ page }) => {
  const { requestStarted, releaseResponse } = await holdRecommendations(page)

  await page.goto('/movies')
  await requestStarted

  const skeletons = page.getByRole('status', { name: 'Loading movie recommendations' })
  await expect(skeletons).toBeVisible()
  await expect(skeletons.locator('article')).toHaveCount(8)

  releaseResponse()

  await expect(page.getByRole('heading', { name: 'Slow test recommendation' })).toBeVisible()
  await expect(page.getByText('Not watched yet')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Vote (0)' })).toBeVisible()
  await expect(skeletons).toHaveCount(0)
})

test('shows poster skeletons when navigating from the recommendation form', async ({ page }) => {
  const { requestStarted, releaseResponse } = await holdRecommendations(page)

  await page.goto('/movies/recommend')
  await page.getByRole('link', { name: 'See recommended movies' }).click()
  await expect(page).toHaveURL(/\/movies$/)
  await requestStarted

  const skeletons = page.getByRole('status', { name: 'Loading movie recommendations' })
  await expect(skeletons).toBeVisible()
  await expect(skeletons.locator('article')).toHaveCount(8)

  releaseResponse()

  await expect(page.getByRole('heading', { name: 'Slow test recommendation' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Vote (0)' })).toBeVisible()
  await expect(skeletons).toHaveCount(0)
})

test('loads more unique recommendations and hides the button when all are shown', async ({ page }) => {
  const firstPageItems = Array.from({ length: 8 }, (_, index) => ({
    isWatched: index === 0,
    voteCount: index === 0 ? 2 : 0,
    hasVoted: false,
    movie: {
      tmdbId: index + 1,
      title: `Recommendation ${index + 1}`,
      posterPath: null,
      releaseDate: '2024-01-01',
      description: null,
    },
  }))
  const secondPageItems = Array.from({ length: 8 }, (_, index) => ({
    isWatched: index === 0,
    voteCount: index === 0 ? 2 : 0,
    hasVoted: false,
    movie: {
      tmdbId: index + 9,
      title: `Recommendation ${index + 9}`,
      posterPath: null,
      releaseDate: '2024-01-01',
      description: null,
    },
  }))

  await page.route('**/api/movie-recommendations**', async (route) => {
    const requestUrl = new URL(route.request().url())
    const pageNumber = Number(requestUrl.searchParams.get('page') ?? 1)
    expect(requestUrl.searchParams.get('per_page')).toBe('8')

    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        page: pageNumber,
        per_page: 8,
        total: 16,
        items: pageNumber === 1 ? firstPageItems : secondPageItems,
      }),
    })
  })

  await page.goto('/movies')
  await expect(page.getByRole('heading', { name: 'Recommendation 8' })).toBeVisible()
  await expect(page.locator('article h3')).toHaveCount(8)
  await expect(page.getByText('Watched', { exact: true })).toHaveCount(1)
  await expect(page.getByText('Not watched yet', { exact: true })).toHaveCount(7)
  await expect(page.getByRole('button', { name: 'Vote (2)' })).toHaveCount(1)
  await page.getByRole('button', { name: 'Show more movies' }).click()

  await expect(page.getByRole('heading', { name: 'Recommendation 16' })).toBeVisible()
  await expect(page.locator('article h3')).toHaveCount(16)
  await expect(page.getByText('Watched', { exact: true })).toHaveCount(2)
  await expect(page.getByText('Not watched yet', { exact: true })).toHaveCount(14)
  await expect(page.getByRole('button', { name: 'Vote (2)' })).toHaveCount(2)
  await expect(page.getByRole('button', { name: 'Show more movies' })).toHaveCount(0)
})

test('allows a browser to vote for and remove a movie vote', async ({ page }) => {
  let voteCount = 0
  let hasVoted = false

  await page.route('**/api/movie-recommendations**', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        page: 1,
        per_page: 8,
        total: 1,
        items: [{
          isWatched: false,
          voteCount,
          hasVoted,
          movie: {
            tmdbId: 321,
            title: 'Vote test movie',
            posterPath: null,
            releaseDate: '2024-01-01',
            description: null,
          },
        }],
      }),
    })
  })

  await page.route('**/api/movies/321/vote', async (route) => {
    if (route.request().method() === 'POST' && !hasVoted) {
      voteCount += 1
      hasVoted = true
    } else if (route.request().method() === 'DELETE' && hasVoted) {
      voteCount -= 1
      hasVoted = false
    }

    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ voteCount, hasVoted }),
    })
  })

  await page.goto('/movies')
  await page.getByRole('button', { name: 'Vote (0)' }).click()
  await expect(page.getByRole('button', { name: 'Remove vote (1)' })).toHaveAttribute('aria-pressed', 'true')

  await page.getByRole('button', { name: 'Remove vote (1)' }).click()
  await expect(page.getByRole('button', { name: 'Vote (0)' })).toHaveAttribute('aria-pressed', 'false')
})