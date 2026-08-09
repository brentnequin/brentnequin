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
  <header class="sticky top-0 z-50 border-b border-[#d8d1c3] bg-[#f4f1ea]/80 backdrop-blur dark:border-[#263241] dark:bg-[#0f1720]/80">
    <nav
      class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
    >
      <NuxtLink
        to="/"
        class="text-lg font-semibold tracking-[0.2em] text-[#23324a] uppercase dark:text-[#e7e2d8]"
      >
        Brent Nequin
      </NuxtLink>

      <div class="flex items-center gap-6 text-sm">
        <NuxtLink
          to="/"
          class="text-[#5d6774] transition hover:text-[#23324a] dark:text-[#9ea8b5] dark:hover:text-[#f4f1ea]"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/projects"
          class="text-[#5d6774] transition hover:text-[#23324a] dark:text-[#9ea8b5] dark:hover:text-[#f4f1ea]"
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
        <!-- <button
            class="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            @click="toggleTheme"
            >
            {{ colorMode.value === 'dark' ? '🌙' : '☀️' }}
        </button> -->
      </div>
    </nav>
  </header>
</template>