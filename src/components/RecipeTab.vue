<script setup>
    // eslint-disable-next-line
    const props = defineProps({
        name: {
            type: String,
            default: "Test recipe Name",
        },
        index: {
            type: Number,
            default: 0
        }
    })
</script>

<template>
    <button class="nav-link" :id="name.replace(/\s+/g, '')+index" data-bs-toggle="tab" :data-bs-target="'#'+name.replace(/\s+/g, '')+index"
        type="button" role="tab" :aria-controls="name.replace(/\s+/g, '')" aria-selected="false">{{name.replace(/\s+/g, '')+index}}</button>
</template>

<style>

</style>