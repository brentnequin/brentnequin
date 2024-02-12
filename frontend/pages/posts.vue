<template>
    <div class="container">
        <h1 class="text-4xl">Posts</h1>
        <div v-for="post in posts" class="mt-4">
            <a v-bind:href="post.link">
                <p class="text-sm text-gray-400">{{ dateFormat(post.pubDate) }}</p>
                <h2 class="text-2xl">{{ post.title }}</h2>
            </a>
        </div>
    </div>
</template>

<script setup>
const { $getPosts } = useNuxtApp();

const posts = await $getPosts('brentnequin');
const dateFormat = date => new Date(date)
  .toLocaleString("default", { year: 'numeric', month: 'long', day: 'numeric' });
</script>