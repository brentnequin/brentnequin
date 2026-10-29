<script setup lang="ts">
import type { Movie } from '~/types/movie'

defineProps<{
  movie: Movie
}>()
</script>

<template>
  <article class="site-card group w-full overflow-hidden text-left transition-transform duration-200 hover:-translate-y-1">
    <!-- Poster -->
    <div class="overflow-hidden bg-[#e4efdf]">
      <img
        :src="movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : '/placeholder.svg'"
        :alt="movie.title"
        class="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <!-- Text -->
    <div class="space-y-1 p-4">
      <h3 class="truncate text-sm font-semibold text-black">
        {{ movie.title }}
      </h3>

      <p class="text-xs text-black/60">
        {{ movie.releaseDate?.slice(0, 4)  }}
      </p>
    </div>
  </article>
</template>