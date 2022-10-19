<script>
    import RecipeTab from '../components/RecipeTab.vue'
    import RecipeContent from '../components/RecipeContent.vue'
    import Instruction from '../components/InstructionView.vue'
    import Ingredient from '../components/IngredientView.vue'

    export default {
        components: {
            Instruction,
            Ingredient
        },

    }
</script>

<template>

    <div class="container-fluid align-items-start">
        <div class="row">
            <div class="col-3">
                <div class="nav nav-tabs flex-column me-3" id="v-tab" role="tablist" aria-orientation="vertical">
                    <!-- eslint-disable-next-line -->
                    <button v-for="n in 20" class="nav-link border p-4 my-2" id="v-settings-tab" data-bs-toggle="pill"
                        :data-bs-target="'#v-settings'+n" type="button" role="tab" aria-controls="v-settings"
                        aria-selected="false">{{n}}</button>
                </div>
            </div>
            <div class="col-9">
                <div class="tab-content" id="v-pills-tabContent">
                    <!-- eslint-disable-next-line -->
                    <div v-for="n in 20" class="tab-pane fade" :id="'v-settings'+n" role="tabpanel" :aria-labelledby="'test'+n"
                        tabindex="0">
                        <div class="container-fluid bg-secondary overflow-auto">
                            <!-- eslint-disable-next-line -->
                            <span v-for="n in 30">{{n}} <br></span>
                            <Instruction></Instruction>
                            <Ingredient></Ingredient>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>