<template>
    <div class="my-24">
        <section id="intro" class="space-y-16">
            <h1 class="text-6xl">Brent Nequin</h1>
        </section>
        <section>
            <ContentDoc path="/about-me" />
        </section>
        <section>
            <h2 id="projects">Projects</h2>
            <div v-for="project in projects">
                <a v-bind:href="project.url">
                    <h3 class="text-xl">{{ project.title }}</h3>
                    <p class="text-lg">{{ project.description }}</p>
                </a>
            </div>
        </section>
        <section>
            <h2 id="posts">Posts</h2>
            <div v-for="post in posts" class="my-8">
                <a v-bind:href="post.link" class="no-underline">
                    <h3 class="text-xl">{{ post.title }}</h3>
                    <p class="text-lg">{{ dateFormat(post.pubDate) }}</p>
                </a>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import projects from '../assets/json/projects.json'

useSeoMeta({ title: 'Brent Nequin' })

const { posts, getPosts } = usePosts();
await getPosts();

posts.value
  .sort((first, second) => new Date(first.pubDate).valueOf() - new Date(second.pubDate).valueOf())
  .slice(0, 4);

const dateFormat = (date: string) => new Date(date)
  .toLocaleString("default", { year: 'numeric', month: 'long', day: 'numeric' });
</script>

<style lang="postcss">
section {
    @apply my-16
}

h2 {
    @apply text-4xl mb-8
}

p {
    @apply text-xl mb-4
}

</style>