<script setup lang="ts">
import { getRecommendations } from '~/services/movieRecommendations';

const perPage = 8
const data = ref<Awaited<ReturnType<typeof getRecommendations>>>()
const pending = ref(true)
const loadingMore = ref(false)
const error = ref<Error | null>(null)
const loadMoreError = ref<Error | null>(null)

const hasMore = computed(() =>
  data.value !== undefined
  && data.value.total !== undefined
  && data.value.items.length < data.value.total
)

onMounted(async () => {
  try {
    data.value = await getRecommendations({ perPage })
  } catch (requestError) {
    error.value = requestError instanceof Error
      ? requestError
      : new Error('Failed to load recommendations')
  } finally {
    pending.value = false
  }
})

async function loadMore() {
  if (!data.value || loadingMore.value || !hasMore.value) return

  loadingMore.value = true
  loadMoreError.value = null

  try {
    const nextPage = await getRecommendations({
      perPage,
      page: data.value.page + 1,
    })
    data.value = {
      ...nextPage,
      items: [...data.value.items, ...nextPage.items],
    }
  } catch (requestError) {
    loadMoreError.value = requestError instanceof Error
      ? requestError
      : new Error('Failed to load more recommendations')
  } finally {
    loadingMore.value = false
  }
}
</script>

<template>
  <div class="w-full py-16">
    <div class="mb-8">
      <p class="site-eyebrow">
        Movie picks
      </p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight text-black">
        Movie Recommendations
      </h1>
      <div class="mt-4">
        <NuxtLink to="/movies/recommend" class="site-button">Recommend a movie <span aria-hidden="true">→</span></NuxtLink>
      </div>
    </div>

    <section aria-labelledby="recent-recommendations-heading" :aria-busy="pending">
      <h2 id="recent-recommendations-heading" class="mb-4 text-2xl font-semibold text-black">Recently Recommended</h2>

      <div v-if="pending" class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" role="status" aria-label="Loading movie recommendations">
        <article v-for="skeleton in 8" :key="skeleton" class="site-card animate-pulse overflow-hidden" aria-hidden="true">
          <div class="h-72 bg-[#e4efdf]"></div>
          <div class="space-y-3 p-4">
            <div class="h-4 w-3/4 rounded bg-[#e4efdf]"></div>
            <div class="h-3 w-1/4 rounded bg-[#e4efdf]"></div>
          </div>
        </article>
        <span class="sr-only">Loading recommendations...</span>
      </div>

      <div v-else-if="error" class="site-card mt-6 p-8 text-black/70">
        Failed to load recommendations.
      </div>

      <div v-else-if="data?.items?.length">
        <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MovieCard
            v-for="rec in data.items"
            :key="rec.movie.tmdbId"
            :movie="rec.movie"
            :recommendation-count="rec.recommendationCount"
          />
        </div>

        <div v-if="hasMore || loadMoreError" class="mt-8 flex flex-col items-center gap-3">
          <p v-if="loadMoreError" class="text-sm text-red-700" role="alert">
            Failed to load more recommendations.
          </p>
          <button
            type="button"
            class="site-button"
            :disabled="loadingMore"
            @click="loadMore"
          >
            {{ loadingMore ? 'Loading...' : loadMoreError ? 'Try again' : 'Show more movies' }}
          </button>
        </div>
      </div>

      <div v-else class="site-card mt-6 p-8 text-black/70">
        No recommendations yet. <NuxtLink to="/movies/recommend" class="ml-2 font-medium text-[#365332] hover:underline">Recommend one →</NuxtLink>
      </div>
    </section>
  </div>
</template>