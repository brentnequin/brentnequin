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

    // data() {
    //     return {
    //         pages: [],
    //         numPagesLoaded: 2,
    //     }
    // },

    // computed: {
    //     loadedPages() {
    //         return this.pages.slice(0, this.numPagesLoaded)
    //     },
    //     isAllPagesLoaded() {
    //         return this.numPagesLoaded >= this.pages.length
    //     }
    // },

    // methods: {
    //     loadMorePages() {
    //         this.numPagesLoaded += 2
    //         console.log(this.numPagesLoaded)
    //     }
    // },

    // async fetch () {
    //     this.pages = await this.$store.dispatch('getPages', this.$config.NOTION_API_DATABASE_ID_DOCS)
    // }
}
</script>