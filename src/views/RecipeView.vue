<script>
    import RecipeTab from '../components/RecipeTab.vue'
    import RecipeContent from '../components/RecipeContent.vue'
    import Instruction from '../components/InstructionView.vue'
    import Ingredient from '../components/IngredientView.vue'
    import {
        getFavourite, getPast
    } from '../utils'

    const USERID = 1

    export default {
        data(){
            return {
                queryType: '',
                selectedRecipe: 0,
                recipes: []
            }
        },
        components: {
            Instruction,
            Ingredient,
        },
        methods: {
            getFavouriteRecipe() {
                console.log('start method');
                getFavourite(USERID).then((value) => {
                    console.log(value);
                    this.recipes = value
                }).catch((message) => {
                    this.recipes = message
                })
                console.log('end method');
            },
            getPastRecipe() {
                console.log('start method');
                getPast(USERID).then((value) => {
                    console.log(value);
                    this.recipes = value
                }).catch((message) => {
                    this.recipes = message
                })
                console.log('end method');
            },
        },
        mounted() {
            this.queryType = this.$route.query.type;
            this.selectedRecipe = this.$route.query.recipeId;
            console.log(this.queryType);
            if (this.queryType == 'favourite') {
                this.getFavouriteRecipe()
            } else if(this.queryType == 'past'){
                this.getPastRecipe()
            }
        }
    }
    

</script>

<template>

    <div class="container-fluid align-items-start">
        <div class="row">
            <div class="col-3">
                <div class="nav nav-pills flex-column me-3" id="v-tab" role="tablist" aria-orientation="vertical">
                    <!-- eslint-disable-next-line -->
                    <button v-for="recipe of recipes" class="nav-link border p-4 my-2" 
                        :class="{active: recipe['recipeId'] == selectedRecipe}" id="v-settings-tab" data-bs-toggle="pill"
                        :data-bs-target="'#v-settings'+recipe['recipeId']" type="button" role="tab" aria-controls="v-settings"
                        :aria-selected="recipe['recipeId'] == selectedRecipe">{{recipe['recipeName']}}
                    </button>
                </div>
            </div>
            <div class="col-9">
                <div class="tab-content" id="v-pills-tabContent">
                    <!-- eslint-disable-next-line -->
                    <div v-for="recipe of recipes" class="tab-pane fade" 
                        :class="{active: recipe['recipeId'] == selectedRecipe, show: recipe['recipeId'] == selectedRecipe}"
                        :id="'v-settings'+recipe['recipeId']" role="tabpanel" :aria-labelledby="'recipe'+recipe['recipeId']"
                        tabindex="0">
                        <div class="container-fluid bg-secondary overflow-auto">
                            <div :style="{ background: 'url(' + recipe['image'] + ') no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height:'35vh'}">
                                <div style="background-color: rgba(0, 0, 0, 0.6); height:inherit">
                                    <div class="d-flex justify-content-center align-items-center mt-2 p-5 text-white rounded" style="height:inherit">
                                        <h1>{{recipe['recipeName']}}</h1>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="p-3 text-white rounded">
                                <h2>Instructions</h2>
                            </div>
                            <Instruction :name="recipe['recipeName']" :recipeId="recipe['recipeId']" :instructions="recipe['instructions'][0]['steps']"></Instruction>
                            <hr>
                            <div class="p-3 text-white rounded">
                                <h2>Ingredients</h2>
                            </div>
                            <Ingredient :name="recipe['recipeName']" :recipeId="recipe['recipeId']" :ingredients="recipe['ingredientDetails']"></Ingredient>
                            <hr>
                            <button v-show="queryType !== 'favourite' && queryType !== 'past'">Favourite</button>
                            <button v-show="queryType !== 'favourite' && queryType !== 'past'">Use this recipe</button>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>