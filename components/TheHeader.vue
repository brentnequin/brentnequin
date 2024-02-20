<template>
    <header class="flex justify-between container py-12 items-center">
        <div class="flex space-x-4">
            <NuxtLink to="/" class="flex items-center">
                <TheIcon class="text-6xl" />
            </NuxtLink>
        </div>
        <div class="flex space-x-4">
            <nav class="flex items-center">
                <NuxtLink to="/posts" class="flex items-center">Posts
                </NuxtLink>
            </nav>
            <!-- <ButtonDarkMode class="mx-2 text-2xl" /> -->
        </div>
    </header>
</template>