<script setup lang="ts">
useSeoMeta({
  title: 'Brent Nequin',
  description: 'Senior Software Engineer building APIs, web applications, and personal projects.',
})

// definePageMeta({
//   layout: 'centered'
// })
</script>

<template>
  <section class="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-6 py-16">
    <div class="w-full max-w-3xl rounded-3xl border border-[#d8d1c3] bg-[#f8f5ee]/80 p-8 shadow-[0_20px_60px_-30px_rgba(35,50,74,0.35)] backdrop-blur-sm dark:border-[#263241] dark:bg-[#111827]/70">
      <p class="text-sm font-medium uppercase tracking-[0.3em] text-[#6b7280] dark:text-[#9ea8b5]">
        Senior Software Engineer
      </p>

      <h1 class="mt-4 text-4xl font-semibold tracking-tight text-[#23324a] sm:text-5xl dark:text-[#f4f1ea]">
        Brent Nequin
      </h1>

      <p class="mt-4 text-lg text-[#5d6774] dark:text-[#c1c7d0]">
        Building calm, reliable software for the web with thoughtful APIs, modern tooling, and a focus on practical impact.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <NuxtLink
          to="/projects"
          class="rounded-full bg-[#23324a] px-5 py-3 text-sm font-medium text-[#f4f1ea] transition hover:bg-[#304561] dark:bg-[#d9cdb8] dark:text-[#1f2a37] dark:hover:bg-[#e8dccb]"
        >
          View Projects
        </NuxtLink>

        <NuxtLink
          to="/movies/recommend"
          class="rounded-full border border-[#b7b0a0] px-5 py-3 text-sm font-medium text-[#23324a] transition hover:bg-[#ece7dc] dark:border-[#4b5563] dark:text-[#f4f1ea] dark:hover:bg-[#1f2937]"
        >
          Recommend a Movie
        </NuxtLink>
      </div>
    </div>
  </section>
</template>