<script setup lang="ts">
import { getRecommendations } from '~/services/movieRecommendations';

const { data, pending, error } = await useAsyncData(
  'movie-recommendations',
  () => getRecommendations({ perPage: 5 })
)
</script>

<template>
    <div>
    <h1 class="text-4xl font-bold">Movie Recommendations</h1>

    <div v-if="pending">
      Loading recommendations...
    </div>

    <div v-else-if="error">
      Failed to load recommendations.
    </div>

    <div v-else>
      <h2 class="text-3xl py-4">Recently Recommended</h2>

      <div class="flex flex-wrap gap-6">
        <MovieCard
          v-for="rec in data?.items"
          :key="rec.id"
          :movie="rec.movie"
        />
      </div>
    </div>
  </div>
</template>