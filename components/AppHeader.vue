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
      </div>
    </nav>
  </header>
</template>