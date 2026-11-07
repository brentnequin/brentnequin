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
            recommendationCount: 2,
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
  await expect(page.getByText('2 recommendations')).toBeVisible()
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
  await expect(page.getByText('2 recommendations')).toBeVisible()
  await expect(skeletons).toHaveCount(0)
})

test('loads more unique recommendations and hides the button when all are shown', async ({ page }) => {
  const firstPageItems = Array.from({ length: 8 }, (_, index) => ({
    recommendationCount: 1,
    movie: {
      tmdbId: index + 1,
      title: `Recommendation ${index + 1}`,
      posterPath: null,
      releaseDate: '2024-01-01',
      description: null,
    },
  }))
  const secondPageItems = Array.from({ length: 8 }, (_, index) => ({
    recommendationCount: 1,
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
  await page.getByRole('button', { name: 'Show more movies' }).click()

  await expect(page.getByRole('heading', { name: 'Recommendation 16' })).toBeVisible()
  await expect(page.locator('article h3')).toHaveCount(16)
  await expect(page.getByRole('button', { name: 'Show more movies' })).toHaveCount(0)
})