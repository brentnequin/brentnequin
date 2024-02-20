<template>
    <footer class="container">
        <!-- <hr class="border px-8" /> -->
        <div class="my-12 flex justify-start space-x-4 text-2xl">
            <NuxtLink to="https://www.linkedin.com/in/brentnequin">
                <IconLinkedIn />
            </NuxtLink>
            <NuxtLink to="https://github.com/brentnequin">
                <IconGitHub />
            </NuxtLink>
            <!-- <ButtonDarkMode class="text-4xl" /> -->
        </div>
        <!-- <div class="m-8 grid grid-cols-2">
            <div class="flex flex-col">
                <a href="https://nuxt.com">
                    <small>Built With Nuxt</small>
                </a>
                <a href="https://vercel.com">
                    <small>Powered By Vercel</small>
                </a>
            </div>
            <div class="flex flex-col">
                <a href="https://paypal.me/turtlx?country.x=US&locale.x=en_US">
                    <small>Buy me a cup of coffee</small>
                </a>
            </div>
        </div>
        <div class="flex justify-center">
            <span class="h-[24px]"><small>© 2022 Brent Nequin. All Rights Reserved.</small></span>
        </div> -->
    </footer>
</template>

<script setup>
import IconLinkedIn from '~icons/carbon/logo-linkedin'
import IconGitHub from '~icons/carbon/logo-github'
</script>