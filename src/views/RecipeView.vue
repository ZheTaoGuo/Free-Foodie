<script>
    import RecipeTab from '../components/RecipeTab.vue'
    import RecipeContent from '../components/RecipeContent.vue'
    import Instruction from '../components/InstructionView.vue'
    import Ingredient from '../components/IngredientView.vue'
    import {
        getFavourite, getPast, getAll
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
            getAllRecipe() {
                console.log('start method');
                getAll().then((value) => {
                    this.recipes = value
                }).catch((message) => {
                    this.recipes = message
                })
                console.log('end methods');
            }
        },
        mounted() {
            this.queryType = this.$route.query.type;
            this.selectedRecipe = this.$route.query.recipeId;
            console.log(this.queryType);
            if (this.queryType == 'favourite') {
                this.getFavouriteRecipe()
            } else if(this.queryType == 'past'){
                this.getPastRecipe()
            }else {
                this.getAllRecipe()
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
            <div class="col-9 position-relative">
                <div class="tab-content position-sticky top-0 bg-secondary" id="v-pills-tabContent" style="overflow-y: auto; max-height: 100vh;">
                    <!-- eslint-disable-next-line -->
                    <div v-for="recipe of recipes" class="tab-pane fade" 
                        :class="{active: recipe['recipeId'] == selectedRecipe, show: recipe['recipeId'] == selectedRecipe}"
                        :id="'v-settings'+recipe['recipeId']" role="tabpanel" :aria-labelledby="'recipe'+recipe['recipeId']"
                        tabindex="0">
                        <div class="container-fluid mt-3">
                            <div :style="{ background: 'url(' + recipe['image'] + ') no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height:'35vh'}">
                                <div style="background-color: rgba(0, 0, 0, 0.5); height:inherit">
                                    <div class="d-flex justify-content-center align-items-center mt-2 p-5 text-white rounded" style="height:inherit">
                                        <h1 style="font-weight: 800; text-shadow: 2px 2px rgba(0, 0, 0, 0.7)" >{{recipe['recipeName']}}</h1>
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
                            <button class="btn btn-secondary" v-show="queryType !== 'favourite' && queryType !== 'past'">Favourite</button>
                            <button class="btn btn-secondary" v-show="queryType !== 'favourite' && queryType !== 'past'">Use this recipe</button>
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