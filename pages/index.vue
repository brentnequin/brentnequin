<template>
    <div class="px-16 my-12">
        <div class="flex justify-center items-center space-x-4">
            <ThePhoto />
            <div class="space-y-2">
                <TheBrand class="text-4xl" />
                <div>Programmer. Guitarist. Pizza Lover.</div>
            </div>
        </div>
    </div>
    <!-- <div class="px-16 my-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <NuxtLink to="#" class="rounded-lg bg-slate-300 px-4 py-2 dark:bg-slate-700">About</NuxtLink>
        <NuxtLink to="#" class="rounded-lg bg-slate-300 px-4 py-2 dark:bg-slate-700">Projects</NuxtLink>
        <NuxtLink to="#" class="rounded-lg bg-slate-300 px-4 py-2 dark:bg-slate-700">Posts</NuxtLink>
        <NuxtLink to="#" class="rounded-lg bg-slate-300 px-4 py-2 dark:bg-slate-700">Contact</NuxtLink>
    </div> -->
    <div class="px-16 my-12 flex justify-center space-x-8">
        <NuxtLink to="https://www.linkedin.com/in/brentnequin">
            <IconLinkedIn class="text-4xl" />
        </NuxtLink>
        <NuxtLink to="https://github.com/brentnequin">
            <IconGitHub class="text-4xl" />
        </NuxtLink>
        <ButtonDarkMode class="text-4xl" />
    </div>
    <!-- <About /> -->
    <!-- <h2 class="container text-2xl my-16">Blog</h2>
    <h2 class="container text-2xl my-16">Projects</h2> -->
</template>

<script setup>
import IconLinkedIn from '~icons/carbon/logo-linkedin'
import IconGitHub from '~icons/carbon/logo-github'

useSeoMeta({title: 'Brent Nequin'})
definePageMeta({layout: "centered"});
</script>