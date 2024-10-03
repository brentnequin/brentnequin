<template>
    <header class="flex justify-between container py-12 items-center">
        <div class="flex space-x-4"></div>
        <div class="flex space-x-4">
            <nav class="flex items-center gap-8">
                <NuxtLink to="/" class="flex items-center">Home</NuxtLink>
                <NuxtLink to="/#projects" class="flex items-center">Projects</NuxtLink>
                <NuxtLink to="/#posts" class="flex items-center">Posts</NuxtLink>
            </nav>
            <div class="my-12 flex justify-start space-x-4 text-2xl">
                <NuxtLink to="https://www.linkedin.com/in/brentnequin">
                    <IconLinkedIn />
                </NuxtLink>
                <NuxtLink to="https://github.com/brentnequin">
                    <IconGitHub />
                </NuxtLink>
                <!-- <ButtonDarkMode class="text-4xl" /> -->
            </div>
        </div>
    </header>
</template>

<script setup>
import IconLinkedIn from '~icons/carbon/logo-linkedin'
import IconGitHub from '~icons/carbon/logo-github'
</script>