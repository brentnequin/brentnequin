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
        per_page: 5,
        total: 1,
        items: [
          {
            id: 101,
            createdAt: '2026-11-02T00:00:00.000Z',
            recommendedName: null,
            message: '',
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
  await expect(skeletons).toHaveCount(0)
})