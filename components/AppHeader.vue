<script setup lang="ts">
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference =
    colorMode.value === 'dark'
      ? 'light'
      : 'dark'
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur dark:bg-zinc-950/80">
    <nav
      class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
    >
      <NuxtLink
        to="/"
        class="text-lg font-semibold tracking-tight"
      >
        Brent Nequin
      </NuxtLink>

      <div class="flex items-center gap-6 text-sm">

        <NuxtLink
          to="/"
          class="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/projects"
          class="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Projects
        </NuxtLink>
<!-- 
        <NuxtLink
          to="/experience"
          class="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Experience
        </NuxtLink>

        <NuxtLink
          to="/blog"
          class="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Blog
        </NuxtLink> -->
        <button
      class="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      @click="toggleTheme"
    >
      {{ colorMode.value === 'dark' ? '🌙' : '☀️' }}
    </button>
      </div>
    </nav>
  </header>
</template>