<template>
  <div
    class="
        site-shell flex min-h-screen flex-col">
    <AppHeader />

    <main class="flex-1 mx-auto max-w-5xl px-6 py-16">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>