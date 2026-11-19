<script setup lang="ts">
definePageMeta({ layout: 'admin' })
</script>

<template>
  <section>
    <p class="site-eyebrow">Dashboard</p>
    <h1 class="mt-3 text-4xl font-semibold tracking-tight text-black">Admin</h1>
    <p class="mt-4 max-w-2xl leading-7 text-black/65">
      Manage private site content and settings.
    </p>

    <div class="mt-8 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
      <NuxtLink
        to="/admin/movies"
        class="site-card block p-6 transition-transform hover:-translate-y-1"
      >
        <h2 class="text-xl font-semibold text-black">Movies</h2>
        <p class="mt-2 leading-6 text-black/65">
          Manage watched status for recommended movies.
        </p>
        <span class="mt-5 inline-block font-medium text-[#365332]">Manage movies →</span>
      </NuxtLink>
    </div>
  </section>
</template>
