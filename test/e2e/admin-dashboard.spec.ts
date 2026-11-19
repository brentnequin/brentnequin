import { expect, test } from '@playwright/test'

test('shows GitHub sign-in on admin routes when signed out', async ({ page }) => {
  await page.goto('/admin')

  await expect(page.getByRole('heading', { name: 'Admin dashboard' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Sign in with GitHub' })).toHaveAttribute('href', '/auth/github')

  await page.goto('/admin/movies')

  await expect(page.getByRole('heading', { name: 'Admin dashboard' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Sign in with GitHub' })).toBeVisible()
})

test('requires authentication for admin movie APIs', async ({ request }) => {
  const listResponse = await request.get('/api/admin/movies')
  expect(listResponse.status()).toBe(401)

  const updateResponse = await request.patch('/api/admin/movies/123', {
    data: { watched: true },
  })
  expect(updateResponse.status()).toBe(401)
})
