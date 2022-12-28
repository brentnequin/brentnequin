<template>
    <header class="flex justify-between container py-4 px-2 md:px-0 items-center">
        <div class="flex space-x-4">
            <NuxtLink to="/" class="flex items-center">
                <TheIcon class="text-4xl" />
                <TheBrand class="text-2xl" />
            </NuxtLink>
            <nav></nav>
        </div>
        <div class="flex space-x-4">
            <ButtonDarkMode class="mx-2" />
        </div>
    </header>
</template>