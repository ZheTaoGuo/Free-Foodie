<script>
    import RecipeTab from '../components/RecipeTab.vue'
    import RecipeContent from '../components/RecipeContent.vue'
    import router from '../router'
    import Instruction from '../components/InstructionView.vue'
    import Ingredient from '../components/IngredientView.vue'
    import {
        getFavourite, getPast, getAll, addToFavourite, retrieveIngredients, addToMissing
    } from '../utils'

    const USERID = 1

    export default {
        data(){
            return {
                queryType: '',
                selectedRecipe: 0,
                recipes: [],
                fridgeContent: [],
                shoppingList: {},
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
            },
            addToFav(){
                console.log('Start addToFav');

                addToFavourite(USERID, this.selectedRecipe)
                router.push('/favourite')

                console.log('End addToFav');
            },
            getAllFridgeIngredient(){
                console.log('Start getAllFridgeIngredient');

                retrieveIngredients().then((value) => {
                    this.fridgeContent = value
                })
                console.log('End getAllFridgeIngredient');
            },
            getMissing(missingIngredient, recipeId){
                // console.log(missingIngredient, recipeId);
                this.shoppingList[recipeId] = missingIngredient
            },
            callAddToMissing(recipeId){
                // console.log(this.shoppingList[recipeId]);
                addToMissing(USERID, this.shoppingList[recipeId])
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

           this.getAllFridgeIngredient()
           console.log(this.shoppingList);
        }
    }
    

</script>

<template>

    <div class="container-fluid align-items-start">
        <div class="row">
            <div class="col-3">
                <div class="nav nav-pills flex-column me-3" id="v-tab" role="tablist" aria-orientation="vertical">
                    <!-- eslint-disable-next-line -->
                    <button v-for="recipe of recipes" class="nav-link border p-4 my-2 receipe-button"
                        :class="{active: recipe['recipeId'] == selectedRecipe}" id="v-settings-tab" data-bs-toggle="pill"
                        :data-bs-target="'#v-settings'+recipe['recipeId']" type="button" role="tab" aria-controls="v-settings"
                        :aria-selected="recipe['recipeId'] == selectedRecipe">{{recipe['recipeName']}}
                    </button>
                </div>
            </div>
            <div class="col-9 position-relative">
                <div class="tab-content position-sticky top-0 background-style" id="v-pills-tabContent" style="overflow-y: auto; max-height: 100vh;">
                    <!-- eslint-disable-next-line -->
                    <div v-for="recipe of recipes" class="tab-pane fade" 
                        :class="{active: recipe['recipeId'] == selectedRecipe, show: recipe['recipeId'] == selectedRecipe}"
                        :id="'v-settings'+recipe['recipeId']" role="tabpanel" :aria-labelledby="'recipe'+recipe['recipeId']"
                        tabindex="0">
                        <div class="container-fluid mt-3 px-4">
                            <div class="image-style" :style="{ background: 'url(' + recipe['image'] + ') no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height:'35vh'}">
                                <div class="image-style" style="background-color: rgba(0, 0, 0, 0.5); height:inherit">
                                    <div class="d-flex justify-content-center align-items-center mt-2 p-5 text-white rounded" style="height:inherit">
                                        <h1 style="font-weight: 800; text-shadow: 2px 2px rgba(0, 0, 0, 0.7)" >{{recipe['recipeName']}}</h1>
                                    </div>
                                </div>
                            </div>
                       
                            <div class="p-3 text-white rounded">
                                <h2 class="instructions-style">Instructions</h2>
                            </div>
                            <Instruction :name="recipe['recipeName']" :recipeId="recipe['recipeId']" :instructions="recipe['instructions'][0]['steps']"></Instruction>
            
                            <div class="p-3 text-white rounded">
                                <h2 class="instructions-style">Ingredients</h2>
                            </div>
                            <Ingredient :name="recipe['recipeName']" :recipeId="recipe['recipeId']" :ingredients="recipe['ingredientDetails']" 
                                :fridge="fridgeContent" @missing="getMissing"></Ingredient>
                            <hr>
                            <button class="btn btn-secondary me-2" v-show="queryType !== 'favourite' && queryType !== 'past'" @click="addToFav()">Favourite</button>
                            <button class="btn btn-secondary" v-show="queryType !== 'favourite' && queryType !== 'past'" @click="callAddToMissing(recipe['recipeId'])">Use this recipe</button>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.background-style{
    background-color: #343b49;
}

.image-style{
    border-radius: 20px;
}

.instructions-style{
    font-weight: 600;
}
.receipe-button{
    background-color: #343b49!important;
    border-color: #343b49!important;
    color: white;
    font-size: 1em;
    font-weight: 500;
}
.receipe-button:hover{
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3)!important;
    background-color: white!important;
    border-color: #343b49!important;
    color: #343b49!important;
    transition-duration: 0.35s;
}

.receipe-button.active{
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3)!important;
    background-color: white!important;
    border-color: #343b49!important;
    color: #343b49!important;
    
}
</style>