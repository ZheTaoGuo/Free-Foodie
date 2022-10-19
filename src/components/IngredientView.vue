<script setup>
    // eslint-disable-next-line
    const props = defineProps({
        name: {
            type: String,
            default: "Test recipe Name",
            // required: true
        },
        index: {
            type: Number,
            default: 0
        }
    })

</script>

<template>
    <div>ingredients</div>
</template>

<style>
    
</style>