<template>
  <div
    class="
        flex min-h-screen flex-col 
        bg-white text-black
        dark:bg-gray-950 dark:text-white">
    <AppHeader />

    <main class="flex-1 mx-auto max-w-5xl px-6 py-16 flex">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>