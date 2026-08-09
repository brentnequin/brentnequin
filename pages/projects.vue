<script setup lang="ts">
const { data: projectsData } = await useAsyncData('projects', () => queryCollection('projects').all())

const projects = computed(() =>
  (projectsData.value ?? []).filter((project: Record<string, unknown>) => project.draft !== true)
)
</script>

<template>
  <div class="mx-auto max-w-6xl py-12">
    <h1 class="mb-8 text-4xl font-bold">
      Projects
    </h1>

    <div class="grid gap-8 md:grid-cols-2">
      <div
        v-for="project in projects"
        :key="project.path"
        class="rounded-xl border p-6"
      >
        <h2 class="text-2xl font-semibold">
          {{ project.title }}
        </h2>

        <p class="mt-2 text-neutral-500">
          {{ project.description }}
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="rounded bg-neutral-200 px-2 py-1 text-sm dark:bg-neutral-800"
          >
            {{ tech }}
          </span>
        </div>

        <div v-if="project.url" class="mt-6">
          <a
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  </div>
</template>