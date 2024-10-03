<template>
    <header class="container py-12 items-center">
        <div class="flex md:hidden justify-end">
            <button class="border-2 rounded border-slate-200 bg-slate-200">
                <IconMenu class="text-xl m-2 text-slate-600" />
            </button>
        </div>
        <div class="hidden md:flex justify-end">
            <div class="flex space-x-4">
                <nav class="flex items-center gap-8">
                    <NuxtLink to="/" class="flex items-center">Home</NuxtLink>
                    <NuxtLink to="/#projects" class="flex items-center">Projects</NuxtLink>
                    <NuxtLink to="/#posts" class="flex items-center">Posts</NuxtLink>
                </nav>
                <div class="flex justify-start space-x-4 text-2xl">
                    <NuxtLink to="https://www.linkedin.com/in/brentnequin">
                        <IconLinkedIn />
                    </NuxtLink>
                    <NuxtLink to="https://github.com/brentnequin">
                        <IconGitHub />
                    </NuxtLink>
                    <!-- <ButtonDarkMode class="text-4xl" /> -->
                </div>
            </div>

        </div>
    </header>
</template>

<script setup>
import IconLinkedIn from '~icons/carbon/logo-linkedin'
import IconGitHub from '~icons/carbon/logo-github'
import IconMenu from '~icons/carbon/menu'
</script>