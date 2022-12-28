<template>
    <div class="container my-24">
        <h2 class="text-2xl my-8">Bio</h2>
        <div class="mx-8">
            <div v-for="item, index in timeline" :key="index" class="flex">
                <span class="min-w-[30%] sm:min-w-[25%] md:min-w-[20%]">{{ item.year + (item.present ? " - Present" : "") }}</span>
                <span>{{ item.description }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timeline: [
                {"year": 1995, "description": "Born in Chicago, Illinois"},
                {"year": 2015, "description": "Worked at Noodles & Company as a Team Member"},
                {"year": 2020, "description": "Graduated from the University of Illinois at Chicago with a Master's degree in Electrical Engineering"},
                {"year": 2021, "description": "Worked at The Numina Group as a Software Engineer"},
                {"year": 2021, "present": true, "description": "Working at Epsilon as a Python/Angular Developer"}
            ]
        }
    }
}
</script>