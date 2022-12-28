<template>
    <button @click="toggleDarkMode">
        <ColorScheme>
            <icon-awake class="text-xl" v-if="$colorMode.value === 'light'" />
            <icon-moon class="text-xl" v-else-if="$colorMode.value === 'dark'" />
            <icon-awake class="text-xl" v-else />
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