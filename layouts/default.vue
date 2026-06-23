<template>
  <div
    class="
        flex min-h-screen flex-col 
        bg-white text-black
        dark:bg-gray-950 dark:text-white">
    <AppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>