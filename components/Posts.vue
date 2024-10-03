<template>
    <div class="container my-24">
        <h2 class="text-3xl text-center my-8">My Blog</h2>
        <div class="m-4 flex flex-wrap justify-center">
            <div v-for="page in loadedPages" v-bind:key="page.id" class="m-4">
                <!-- <NuxtLink :to="{path: 'read', query: { s: page.id }}" no-prefetch> -->
                <a :href="`/read?s=${page.id}`">
                <!-- <a :href="page.url"> -->
                    <Card 
                        :title="page.properties.Name.title[0].plain_text"
                        :created-time="page.created_time"
                        :imgSrc="page.cover[page.cover.type].url"
                        no-subtitle
                    />
                </a>
                <!-- </NuxtLink> -->
                <!-- {{ page }} -->
            </div>
        </div>
        <div v-if="!isAllPagesLoaded" class="flex justify-center">
            <button class="p-2 rounded bg-green-400" @click="loadMorePages">View More</button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>