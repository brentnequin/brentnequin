<script setup lang="ts">
const projects = ref([
    {
        title: "Personal API",
        description: "A Flask-based REST API powering my personal applications and experiments, featuring secure authentication, infrastructure as code, and automated deployments.",
        highlights: [
            "Flask + SQLAlchemy + Alembic",
            "API key authentication",
            "PostgreSQL database",
            "Terraform-managed infrastructure",
            "CI/CD with GitHub Actions",
            "Multiple environments (dev/prod)",
            "Comprehensive testing with pytest"
        ],
        technologies: [
            "Python",
            "Flask",
            "PostgreSQL",
            "SQLAlchemy",
            "Terraform",
            "GitHub Actions",
            "Docker"
        ]
    },
    {
        title: "Personal Homepage",
        description: "A modern, responsive personal website built with Nuxt that serves as a central hub for my projects, experience, and interests.",
        highlights: [
            "Server-side rendering and static generation with Nuxt",
            "Responsive design with Tailwind CSS",
            "Dynamic content powered by my Personal API",
            "Project portfolio and experience pages",
            "Movie recommendation integration",
            "Deployed with automated CI/CD"
        ],
        technologies: [
            "Nuxt 4",
            "Vue 3",
            "TypeScript",
            "Tailwind",
            "CSS",
            "Pinia"
        ]
    }
])

</script>

<template>
  <div>
    <div class="mb-12">
      <h1 class="text-4xl font-bold">Projects</h1>
      <p class="mt-3 text-neutral-400">
        A collection of personal projects I'm actively building and maintaining.
      </p>
    </div>

    <div class="space-y-8">
      <article
        v-for="project in projects"
        :key="project.title"
        class="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 transition hover:border-neutral-700"
      >
        <h2 class="text-2xl font-semibold">
          {{ project.title }}
        </h2>

        <p class="mt-4 text-neutral-300">
          {{ project.description }}
        </p>

        <!-- <div class="mt-6">
          <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Highlights
          </h3>

          <ul class="space-y-2 text-neutral-300">
            <li
              v-for="highlight in project.highlights"
              :key="highlight"
              class="flex items-start gap-3"
            >
              <span class="mt-1 text-neutral-500">•</span>
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </div>

        <div class="mt-8">
          <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Technologies
          </h3>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="technology in project.technologies"
              :key="technology"
              class="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-300"
            >
              {{ technology }}
            </span>
          </div>
        </div> -->
      </article>
    </div>
  </div>
</template>

