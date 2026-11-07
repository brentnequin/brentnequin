<template>
  <header class="sticky top-0 z-50 bg-inherit">
    <nav class="site-container flex items-center justify-between py-4">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-xl font-normal text-black"
      >
        <img src="/quarter-rest.svg" alt="" aria-hidden="true" class="h-5 w-5 shrink-0" />
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