<template>
    <div class="container">
        {{ posts }}
    </div>
</template>

<script setup>
const { $getPosts } = useNuxtApp();

const posts = await $getPosts('brentnequin');
console.log(posts)
</script>