<template>
  <div class="flex min-h-screen flex-col bg-gray-950 text-white">
    <AppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>