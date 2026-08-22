<script setup lang="ts">
const { data: projectsData } = await useAsyncData('projects', () => queryCollection('projects').all())

const projects = computed(() =>
  (projectsData.value ?? []).filter((project: Record<string, unknown>) => project.draft !== true)
)
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16">
    <div class="mb-10">
      <h1 class="mt-3 text-4xl font-semibold tracking-tight text-[#23324a] dark:text-[#f4f1ea]">
        Projects
      </h1>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <div
        v-for="project in projects"
        :key="project.path"
        class="rounded-3xl border border-[#d8d1c3] bg-[#f8f5ee]/80 p-6 shadow-[0_18px_45px_-25px_rgba(35,50,74,0.35)] backdrop-blur-sm dark:border-[#263241] dark:bg-[#111827]/70"
      >
        <h2 class="text-2xl font-semibold text-[#23324a] dark:text-[#f4f1ea]">
          {{ project.title }}
        </h2>

        <p class="mt-3 text-[#5d6774] dark:text-[#c1c7d0]">
          {{ project.description }}
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="rounded-full bg-[#ece7dc] px-3 py-1 text-sm text-[#23324a] dark:bg-[#243447] dark:text-[#f4f1ea]"
          >
            {{ tech }}
          </span>
        </div>

        <div v-if="project.url" class="mt-6">
          <a
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center rounded-full bg-[#23324a] px-4 py-2 text-sm font-medium text-[#f4f1ea] transition hover:bg-[#304561] dark:bg-[#d9cdb8] dark:text-[#1f2a37] dark:hover:bg-[#e8dccb]"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  </div>
</template>