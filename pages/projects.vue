<script setup lang="ts">
const { data: projectsData } = await useAsyncData('projects', () => queryCollection('projects').all())

const projects = computed(() =>
  (projectsData.value ?? []).filter((project: Record<string, unknown>) => project.draft !== true)
)
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16">
    <div class="mb-10">
      <h1 class="mt-3 text-4xl font-semibold tracking-tight text-black">
        Projects
      </h1>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div
        v-for="(project, index) in projects"
        :key="project.path"
        class="site-card flex min-h-64 flex-col p-6 sm:p-7"
      >
        <div class="flex items-center justify-between">
          <span class="site-eyebrow text-sm tabular-nums">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="site-tag px-3 py-1 text-xs font-medium">{{ project.status }}</span>
        </div>

        <h2 class="mt-8 text-2xl font-semibold tracking-tight text-black">
          {{ project.title }}
        </h2>

        <p class="mt-2 text-sm leading-6 text-black/70">
          {{ project.description }}
        </p>

        <div class="mt-auto flex flex-wrap gap-2 pt-6">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="site-tag px-2.5 py-1 text-xs"
          >
            {{ tech }}
          </span>
        </div>

        <div v-if="project.url" class="mt-6">
          <a
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="site-button"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  </div>
</template>