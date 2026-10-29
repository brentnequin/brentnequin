<template>
  <header class="sticky top-0 z-50 bg-inherit">
    <nav
      class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
    >
      <NuxtLink
        to="/"
        class="text-xl font-normal text-black"
      >
        Brent Nequin
      </NuxtLink>

      <div class="flex items-center gap-6 text-base">
        <NuxtLink
          to="/"
          class="site-nav-link"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/projects"
          class="site-nav-link"
        >
          Projects
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>