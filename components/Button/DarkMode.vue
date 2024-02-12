<template>
    <button @click="toggleDarkMode">
        <ColorScheme>
            <icon-awake v-if="$colorMode.value === 'light'" />
            <icon-moon v-else-if="$colorMode.value === 'dark'" />
            <icon-awake v-else />
        </ColorScheme>
    </button>
</template>

<script setup>
import IconAwake from '~icons/carbon/awake'
import IconMoon from '~icons/carbon/moon'

const colorMode = useColorMode()

function toggleDarkMode() {
    colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
}
</script>