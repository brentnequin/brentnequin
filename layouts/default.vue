<template>
  <div
    class="
        site-shell flex min-h-screen flex-col">
    <AppHeader />

    <main class="site-container flex-1 py-16">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>