<script setup lang="ts">
import type { Movie } from '~/types/movie'

const props = defineProps<{
  movie: Movie
  recommendationCount?: number
}>()

const posterLoaded = ref(false)

const posterUrl = computed(() =>
  props.movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${props.movie.posterPath}`
    : '/placeholder.svg'
)

function handlePosterError(event: Event) {
  const image = event.target as HTMLImageElement

  if (image.dataset.fallback !== 'true') {
    image.dataset.fallback = 'true'
    image.src = '/placeholder.svg'
    return
  }

  posterLoaded.value = true
}
</script>

<template>
  <article class="site-card group w-full overflow-hidden text-left transition-transform duration-200 hover:-translate-y-1">
    <!-- Poster -->
    <div class="relative h-72 overflow-hidden bg-[#e4efdf]">
      <div
        v-if="!posterLoaded"
        class="absolute inset-0 animate-pulse bg-[#e4efdf]"
        aria-hidden="true"
      ></div>
      <img
        :src="posterUrl"
        :alt="movie.title"
        :class="['absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105', posterLoaded ? 'opacity-100' : 'opacity-0']"
        loading="lazy"
        decoding="async"
        @load="posterLoaded = true"
        @error="handlePosterError"
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

      <p v-if="recommendationCount" class="site-tag inline-block px-2 py-1 text-xs">
        {{ recommendationCount }} recommendation{{ recommendationCount === 1 ? '' : 's' }}
      </p>
    </div>
  </article>
</template>