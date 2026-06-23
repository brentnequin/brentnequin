<script setup lang="ts">
useSeoMeta({
  title: 'Brent Nequin',
  description: 'Senior Software Engineer building APIs, web applications, and personal projects.',
})
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <main class="mx-auto max-w-6xl px-6 py-16">
      <!-- Hero -->
      <section class="mb-24">
        <h1 class="text-5xl font-bold tracking-tight">
          Brent Nequin
        </h1>

        <p class="mt-4 text-xl text-gray-400">
          Senior Software Engineer · Chicago, IL
        </p>

        <p class="mt-6 max-w-2xl text-lg text-gray-300 leading-8">
          Building APIs, cloud infrastructure, and software that
          solves real-world problems with Python, React, and
          modern web technologies.
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink
            to="/projects"
            class="rounded-lg bg-white px-5 py-3 text-black font-medium hover:bg-gray-200"
          >
            View Projects
          </NuxtLink>

          <NuxtLink
            to="/movies"
            class="rounded-lg border border-gray-700 px-5 py-3 hover:bg-gray-900"
          >
            Recommend a Movie
          </NuxtLink>
        </div>
      </section>

      <!-- About -->
      <section class="mb-24">
        <h2 class="mb-6 text-3xl font-semibold">
          About
        </h2>

        <p class="max-w-3xl text-gray-300 leading-8">
          I'm a Senior Software Engineer specializing in Python,
          APIs, cloud infrastructure, and full-stack applications.
          I enjoy creating tools that simplify complex problems
          and building personal projects that continuously evolve.
        </p>
      </section>

      <!-- Featured Projects -->
      <section class="mb-24">
        <h2 class="mb-8 text-3xl font-semibold">
          Featured Projects
        </h2>

        <div class="grid gap-6 md:grid-cols-3">
          <ProjectCard
            title="Personal API"
            description="Flask API powering my personal applications."
          />

          <ProjectCard
            title="Movie Recommendations"
            description="Users can recommend movies and track watch status."
          />

          <ProjectCard
            title="Infrastructure as Code"
            description="Terraform-managed cloud infrastructure."
          />
        </div>
      </section>

      <!-- Currently -->
      <section class="mb-24">
        <h2 class="mb-6 text-3xl font-semibold">
          Currently
        </h2>

        <ul class="space-y-3 text-gray-300">
          <li>⚡ Building my Personal API</li>
          <li>📚 Learning Nuxt</li>
          <li>☁️ Exploring Terraform and cloud automation</li>
        </ul>
      </section>

      <!-- Movie Widget -->
      <section>
        <h2 class="mb-6 text-3xl font-semibold">
          Recent Movie Recommendations
        </h2>

        <MovieRecommendations />
      </section>
    </main>
  </div>
</template>