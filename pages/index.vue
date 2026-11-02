<script setup lang="ts">
const { data: projectsData } = await useAsyncData('home-featured-projects', () => queryCollection('projects').all())

const featuredProjects = computed(() =>
  (projectsData.value ?? [])
    .filter(project => project.featured === true && project.draft !== true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 2)
)

useSeoMeta({
  title: 'Brent Nequin',
  description: 'Thoughtful web projects, useful tools, and movie recommendations by Brent Nequin.',
})
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-20 py-8 sm:py-12">
    <section class="grid gap-8 border-b border-black/10 pb-16 sm:grid-cols-[1fr_auto] sm:items-end sm:pb-20">
      <div class="max-w-2xl">
        <p class="site-eyebrow mb-5">A small corner of the internet</p>
        <h1 class="text-5xl font-semibold leading-[1.05] tracking-tight text-black sm:text-6xl">
          Hi, I’m Brent.
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-8 text-black/70">
          This is where I share what I’m making, what I’m watching, and whatever I’m curious about lately.
        </p>
      </div>
      <NuxtLink
        to="/projects"
        class="site-button"
      >
        Explore my projects <span aria-hidden="true">↗</span>
      </NuxtLink>
    </section>

    <section aria-labelledby="featured-heading">
      <div class="mb-6 flex items-end justify-between gap-4">
        <div>
          <p class="site-eyebrow">Selected work</p>
          <h2 id="featured-heading" class="mt-2 text-3xl font-semibold tracking-tight text-black">A few things I’ve made</h2>
        </div>
        <NuxtLink to="/projects" class="hidden text-sm text-black/65 transition hover:text-black sm:inline">All projects <span aria-hidden="true">→</span></NuxtLink>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <article
          v-for="(project, index) in featuredProjects"
          :key="project.path"
          class="site-card flex min-h-64 flex-col p-6 sm:p-7"
        >
          <div class="flex items-center justify-between">
            <span class="site-eyebrow text-sm tabular-nums">0{{ index + 1 }}</span>
            <span class="site-tag px-3 py-1 text-xs font-medium">{{ project.status }}</span>
          </div>
          <h3 class="mt-8 text-2xl font-semibold tracking-tight text-black">{{ project.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-black/70">{{ project.description }}</p>
          <div class="mt-auto flex flex-wrap gap-2 pt-6">
            <span
              v-for="technology in project.technologies"
              :key="technology"
              class="site-tag px-2.5 py-1 text-xs"
            >
              {{ technology }}
            </span>
          </div>
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="site-button mt-6"
          >
            Visit project <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
    </section>

    <section class="site-card site-callout flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9" aria-labelledby="movie-heading">
      <div class="max-w-xl">
        <p class="site-eyebrow">Trade a good watch</p>
        <h2 id="movie-heading" class="mt-2 text-3xl font-semibold tracking-tight text-black">What should I watch next?</h2>
        <p class="mt-3 leading-7 text-black/70">
          Send me a movie recommendation. Tell me what makes it worth watching, and I’ll add it to my list.
        </p>
      </div>
      <NuxtLink
        to="/movies/recommend"
        class="site-button shrink-0"
      >
        Recommend a movie <span aria-hidden="true">→</span>
      </NuxtLink>
    </section>
  </div>
</template>