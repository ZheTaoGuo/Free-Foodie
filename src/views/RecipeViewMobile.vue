<script>
    import RecipeTab from '../components/RecipeTab.vue'
    import RecipeContent from '../components/RecipeContent.vue'
    import router from '../router'
    import Instruction from '../components/InstructionView.vue'
    import Ingredient from '../components/IngredientView.vue'
    import Footer from '../components/Footer.vue'
    import NavBar from '../components/Navbar.vue'
    import {
        getFavourite,
        getPast,
        getAll,
        addToFavourite,
        addToPast,
        retrieveIngredients,
        addToMissing,
        getLoggedInUser,
        isLoggedIn
    } from '../utils'


    export default {
        data() {
            return {
                queryType: '',
                selectedRecipe: 0,
                recipes: [],
                fridgeContent: [],
                shoppingList: {},
                loggedInUser: 0,
            }
        },
        components: {
            Instruction,
            Ingredient,
            NavBar,
            Footer
        },
        async mounted() {
            
            console.log('In mobile View');
            const currentUser = await getLoggedInUser();
            this.loggedInUser = currentUser.userId
            console.log('Current UserId: ', this.loggedInUser);

            this.queryType = this.$route.query.type;
            this.selectedRecipe = this.$route.query.recipeId;
            console.log(this.queryType);
            if (this.queryType == 'favourite') {
                this.getFavouriteRecipe()
            } else if (this.queryType == 'past') {
                this.getPastRecipe()
            } else {
                this.getAllRecipe()
            }
            this.getAllFridgeIngredient()
            console.log(this.shoppingList);
        },
        methods: {
            isLoggedIn,
            getFavouriteRecipe() {
                console.log('start method');
                getFavourite(this.loggedInUser).then((value) => {
                    console.log(value);
                    this.recipes = value
                }).catch((message) => {
                    this.recipes = message
                })
                console.log('end method');
            },
            getPastRecipe() {
                console.log('start method');
                getPast(this.loggedInUser).then((value) => {
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
            addToFav() {
                console.log('Start addToFav');

                addToFavourite(this.loggedInUser, this.selectedRecipe)

                console.log('End addToFav');
            },
            getAllFridgeIngredient() {
                console.log('Start getAllFridgeIngredient');

                retrieveIngredients().then((value) => {
                    this.fridgeContent = value
                })
                console.log('End getAllFridgeIngredient');
            },
            getMissing(missingIngredient, recipeId) {
                this.shoppingList[recipeId] = missingIngredient
            },
            callAddToMissing(recipeId) {
                addToPast(this.loggedInUser, this.selectedRecipe)
                addToMissing(this.loggedInUser, this.shoppingList[recipeId])
            },
            updateSelectedRecipe(recipeId){
                this.selectedRecipe = recipeId
            }
        }
    }
</script>

<template>
    <!-- Modal popup to notifiy of missing ingredients add -->
    <div class="modal fade" id="missingModal" tabindex="-1" aria-labelledby="itemModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="itemModal">Added New Ingredient</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h6>
                        All missing ingredients have been added to your shopping list!
                    </h6>
                </div>
            </div>
        </div>
    </div> <!-- End of Modal -->

    <!-- Modal popup to notifiy that recipe was added to favourite -->
    <div class="modal fade" id="favouriteModal" tabindex="-1" aria-labelledby="itemModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="itemModal">Added New Recipe</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h6>
                        Recipe has been added to Favourite
                    </h6>
                </div>
            </div>
        </div>
    </div> <!-- End of Modal -->

    <NavBar @checkLogin="isLoggedIn()"></NavBar>
    <div class="container-fluid align-items-start mt-2">
        <div class="row">
            <div class="col">
                <div class="scrollmenu container">
                    <template v-for="recipe of recipes">
                        <button class="nav-link border p-4 my-2 receipe-button"
                            :class="{active: recipe['recipeId'] == selectedRecipe}" id="v-settings-tab"
                            data-bs-toggle="pill" :data-bs-target="'#v-settings'+recipe['recipeId']" type="button"
                            role="tab" aria-controls="v-settings"
                            :aria-selected="recipe['recipeId'] == selectedRecipe" @click="updateSelectedRecipe(recipe['recipeId'])">{{recipe['recipeName']}}
                        </button>
                    </template>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="tab-content background-style" id="v-pills-tabContent">
                    <!-- eslint-disable-next-line -->
                    <div v-for="recipe of recipes" class="tab-pane fade"
                        :class="{active: recipe['recipeId'] == selectedRecipe, show: recipe['recipeId'] == selectedRecipe}"
                        :id="'v-settings'+recipe['recipeId']" role="tabpanel"
                        :aria-labelledby="'recipe'+recipe['recipeId']" tabindex="0">
                        <div class="container-fluid mt-3 px-4 pt-2">
                            <div class="image-style"
                                :style="{ background: 'url(' + recipe['image'] + ') no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height:'35vh'}">
                                <div class="image-style" style="background-color: rgba(0, 0, 0, 0.5); height:inherit">
                                    <div class="d-flex justify-content-center align-items-center mt-2 p-5 text-white rounded"
                                        style="height:inherit">
                                        <h1 style="font-weight: 800; text-shadow: 2px 2px rgba(0, 0, 0, 0.7)">
                                            {{recipe['recipeName']}}</h1>
                                    </div>
                                </div>
                            </div>

                            <div class="p-3 text-dark rounded">
                                <h2 class="instructions-style">Instructions</h2>
                            </div>
                            <Instruction :name="recipe['recipeName']" :recipeId="recipe['recipeId']"
                                :instructions="recipe['instructions'][0]['steps']"></Instruction>

                            <div class="p-3 text-dark rounded">
                                <h2 class="instructions-style">Ingredients</h2>
                            </div>
                            <Ingredient :name="recipe['recipeName']" :recipeId="recipe['recipeId']"
                                :ingredients="recipe['ingredientDetails']" :fridge="fridgeContent"
                                @missing="getMissing"></Ingredient>
                            <hr>
                            <button type="button" class="btn btn-secondary me-2" data-bs-toggle="modal" v-show="queryType !== 'favourite' && queryType !== 'past'"
                                data-bs-target="#favouriteModal" @click="addToFav()">
                                Favourite
                            </button>
                            <button type="button" class="btn btn-secondary ms-2" data-bs-toggle="modal" v-show="queryType !== 'favourite' && queryType !== 'past'"
                                data-bs-target="#missingModal"  @click="callAddToMissing(recipe['recipeId'])">
                                Use this recipe
                            </button>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<style scoped>
    .background-style {
        background-color: rgb(183, 221, 234);
    }

    .image-style {
        border-radius: 20px;
    }

    .instructions-style {
        font-weight: 600;
    }

    .receipe-button {
        background-color: white !important;
        border-color: rgba(0, 0, 0, 0.5) !important;
        color: black !important;
        font-weight: 500;
    }

    .receipe-button:hover {
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3) !important;
        background-color: rgb(183, 221, 234) !important;
        border-color: white !important;
        color: black !important;
        font-weight: 500;
    }

    .receipe-button.active {
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3) !important;
        background-color: rgb(183, 221, 234) !important;
        border-color: white !important;
        color: black !important;
        font-weight: 500;
    }

    div.scrollmenu {
        color: rgb(183, 221, 234);
        overflow: auto;
        white-space: nowrap;
    }

    div.scrollmenu button {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px;
    text-decoration: none;
    margin-right:5px;
    margin-left: 5px;
    }
</style>