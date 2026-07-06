<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () => queryCollection('projects')
    // .order('order', 'ASC')
    .all()
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
      </div>
    </div>
  </div>
</template>