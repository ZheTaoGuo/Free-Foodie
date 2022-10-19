<script setup>
    import Instruction from './InstructionView.vue'
    import Ingredient from './IngredientView.vue'
    // eslint-disable-next-line
    const props = defineProps({
        index: {
            type: Number,
            default: 0
        },
        name: {
            type: String,
            default: "Test recipe Name",
            // required: true
        },
        instructions: {
            type: Array,
            default () {
                return []
            }
        },
        ingredients: {
            type: Array,
            default () {
                return []
            }
        }
    })
</script>

<script>
    export default {
        components: {
            Instruction,
            Ingredient
        },

    }
</script>

<template>
    <div class="tab-pane fade" :id="'TestrecipeName'+index" role="tabpanel" :aria-labelledby="'TestrecipeName'+index"
        tabindex="0">
        {{name}}
        <Instruction></Instruction>
        <Ingredient></Ingredient>
    </div>
</template>

<style>

</style>