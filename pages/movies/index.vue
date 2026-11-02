<script setup lang="ts">
import { getRecommendations } from '~/services/movieRecommendations';

const { data, pending, error } = await useAsyncData(
  'movie-recommendations',
  () => getRecommendations({ perPage: 5 })
)
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16">
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

    <div v-if="pending" class="site-card p-8 text-black/70">
      Loading recommendations...
    </div>

    <div v-else-if="error" class="site-card p-8 text-black/70">
      Failed to load recommendations.
    </div>

    <div v-else>
      <h2 class="mb-4 text-2xl font-semibold text-black">Recently Recommended</h2>

      <div v-if="data?.items?.length" class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <MovieCard
          v-for="rec in data?.items"
          :key="rec.id"
          :movie="rec.movie"
        />
      </div>

      <div v-else class="site-card mt-6 p-8 text-black/70">
        No recommendations yet. <NuxtLink to="/movies/recommend" class="ml-2 font-medium text-[#365332] hover:underline">Recommend one →</NuxtLink>
      </div>
    </div>
  </div>
</template>