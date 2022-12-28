<template>
    <button @click="toggleDarkMode">
        <icon-sun class="text-2xl" v-if="$colorMode.value === 'light'" />
        <icon-moon class="text-2xl" v-if="$colorMode.value === 'dark'" />
    </button>
</template>

<script setup>
import IconSun from '~icons/carbon/sun'
import IconMoon from '~icons/carbon/moon'

const colorMode = useColorMode()

console.log(colorMode.value)

function toggleDarkMode() {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>