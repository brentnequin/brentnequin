<template>
    <div class="my-24">
        <div class="space-y-16">
            <!-- <TheBrand class="text-6xl" /> -->
            <h1 class="text-6xl">Brent Nequin</h1>
            <div class="text-gray-300 space-y-6">
                <p>Programmer. Guitarist. Pizza Devourer.</p>
                <p>Senior Developer at <a href="https://www.epsilon.com">Epsilon</a>.</p>
            </div>
        </div>
    </div>
    <!-- <div class="px-16 my-12 text-start animate-fade delay-1000">
        <NuxtLink to="https://blog.brentnequin.com" class="rounded-lgpx-4 py-2 text-xl">Posts</NuxtLink>
    </div> -->
</template>

<script setup lang="ts">
useSeoMeta({title: 'Brent Nequin'})
// definePageMeta({layout: "centered"});

let loading = ref(true)

useNuxtApp().hook('page:finish', () => { loading.value = false });
</script>

<style lang="postcss" scoped>
  .post-title {
    @apply text-2xl
  }

  .animate-fade {
    @apply transition-all duration-500 ease-in
  }
</style>