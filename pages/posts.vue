<template>
  <h1 class="title">Posts</h1>
  <div v-for="post in posts" class="mt-4">
    <span class="post-publish-date">{{ dateFormat(post.pubDate) }}</span>
    <span class="post-category" v-for="category in post.categories">{{ category }}</span>
    <a v-bind:href="post.link">
      <h2 class="post-title">{{ post.title }}</h2>
    </a>
  </div>
</template>

<script setup>
const { $getPosts } = useNuxtApp();

const posts = await $getPosts('brentnequin');
const dateFormat = date => new Date(date)
  .toLocaleString("default", { year: 'numeric', month: 'long', day: 'numeric' });
</script>

<style lang="postcss" scoped>
  .post-title {
    @apply text-2xl
  }

  .post-category {
    @apply bg-slate-50 text-slate-600 ml-2 rounded-full px-2 text-sm
  }

  .post-publish-date {
    @apply text-gray-400
  }
</style>