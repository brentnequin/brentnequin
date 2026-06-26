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
        <h2 class="text-3xl py-4">Recently Recommended</h2>
        <div class="flex space-x-4">
            <MovieCard
                v-for="(rec, id) in data?.items"
                :key="id"
                :movie="rec.movie"
            />
        </div>
    </div>
</template>