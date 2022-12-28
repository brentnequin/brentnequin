<template>
    <div class="w-72">
        <div class="h-32 w-full rounded-md bg-cover bg-center bg-no-repeat bg-gradient-to-r from-sky-500 to-indigo-500" :style='imgSrc ? `background-image: url("${imgSrc}")` : ""'></div>
        <div class="my-8">
            <div class="text-xs text-gray-400">{{ new Date(createdTime).toDateString().split(' ').slice(1).join(' ') }}</div>
            <h4 class="font-bold mb-2">{{ title }}</h4>
            <div v-if="!noSubtitle" class="text-xs text-gray-400">
                {{ subtitle }}
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        imgSrc: {
            type: String
        },
        title: {
            type: String,
            default: "Title"
        },
        subtitle: {
            type: String,
            default: "Subtitle"
        },
        createdTime: {
            type: String,
            default: "2022-10-11T19:58:00.000Z"
        },
        horizontal: {
            type: Boolean,
        },
        noSubtitle: Boolean
    }
}
</script>