<template>
    <header class="flex justify-between container py-4 px-2 md:px-0 items-center">
        <div class="flex space-x-4">
            <NuxtLink to="/" class="flex items-center">
                <TheIcon class="text-4xl" />
                <TheBrand class="text-2xl" />
            </NuxtLink>
        </div>
        <div class="flex space-x-4">
            <nav class="flex items-center">
                <NuxtLink to="/posts" class="flex items-center">Posts
                </NuxtLink>
            </nav>
            <ButtonDarkMode class="mx-2 text-2xl" />
        </div>
    </header>
</template>