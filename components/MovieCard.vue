<script setup lang="ts">
import type { Movie } from '~/types/movie'

defineProps<{
  movie: Movie
}>()
</script>

<template>
  <div class="group w-48">
    <!-- Poster -->
    <div class="overflow-hidden rounded-xl bg-neutral-900 shadow-md">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.posterPath}` || '/placeholder.jpg'"
        :alt="movie.title"
        class="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <!-- Text -->
    <div class="mt-3 space-y-1 text-left">
      <h3 class="text-sm font-semibold text-white truncate">
        {{ movie.title }}
      </h3>

      <p class="text-xs text-neutral-400">
        {{ movie.releaseDate.slice(0, 4)  }}
      </p>
    </div>
  </div>
</template>