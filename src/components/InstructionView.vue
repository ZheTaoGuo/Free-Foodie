<script setup>
    // eslint-disable-next-line
    const props = defineProps({
        name: {
            type: String,
            default: "Test recipe Name",
            // required: true
        },
        recipeId: {
            type: Number,
            default: 0
        },
        instructions: {
            type: Array,
            default () {
                return []
            }
        }
    })
</script>

<template>
    <ul class="list-group text-start instruction-style">
        <li class="list-group-item" v-for="step of instructions">
            Step {{step.number}}: {{step.step}}
        </li>
    </ul>
</template>

<style scoped>

.instruction-style{
    font-size: 1.5em;
}
</style>