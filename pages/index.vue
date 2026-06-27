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
    <section
      class="
        flex min-h-[calc(100vh-200px)]
        flex-col items-center justify-center
      "
    >
      <div class="mb-24">
        <h1 class="text-5xl font-bold tracking-tight">
          Brent Nequin
        </h1>

        <p class="mt-4 text-xl text-gray-400">
          Senior Software Engineer · Chicago, IL
        </p>

        <p class="mt-6 max-w-2xl text-lg dark:text-gray-300 leading-8">
          Building APIs, cloud infrastructure, and software that
          solves real-world problems with Python, React, and
          modern web technologies.
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink
            to="/projects"
            class="rounded-lg bg-gray-400 dark:bg-white px-5 py-3 text-black font-medium hover:bg-gray-200"
          >
            View Projects
          </NuxtLink>

          <NuxtLink
            to="/movies/recommend"
            class="rounded-lg border border-gray-700 px-5 py-3 hover:bg-gray-900"
          >
            Recommend a Movie
          </NuxtLink>
        </div>
      </div>
    </section>
</template>