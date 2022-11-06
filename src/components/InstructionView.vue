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
    <div class="text-light instructions">
        <table>
            <tr v-for="step of instructions" style="text-align:left">
                <td class="stepnum">{{step.number}}</td>
                <td class="stepstep">{{step.step}}</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>

.instructions{
    font-size: 1.2em;
}
.stepnum{
    font-size: x-large;
    font-weight: 500;
    border-right: 2px solid white;
    margin-right: 1.2em;
    text-align: right;
    padding: 0.5em;
}

table{
    border-collapse: separate;
    border-spacing: 15px 15px;
}
</style>