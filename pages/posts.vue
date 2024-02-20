<template>
  <h1 class="title">Posts</h1>
  <div v-for="post in posts" class="my-8">
    <a v-bind:href="post.link" class="no-underline">
      <p class="post-publish-date">{{ dateFormat(post.pubDate) }}</p>
      <!-- <span class="post-category" v-for="category in post.categories">{{ category }}</span> -->
      <h2 class="post-title">{{ post.title }}</h2>
    </a>
  </div>
  <a href="https://blog.brentnequin.com">
    <span class="flex mt-16">
      Read More Posts By Me <IconArrowUpRightBold class="mx-1" />
    </span>
  </a>
</template>

<script setup>
import IconArrowUpRightBold from '~icons/mdi/arrow-up-right'

const { posts, getPosts } = usePosts();
await getPosts();

posts.value
  .sort((first, second) => new Date(first.pubDate) - new Date(second.pubDate))
  .slice(0, 4);

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
    @apply text-gray-300
  }
</style>