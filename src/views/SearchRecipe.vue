<script>
    import Card from '../components/CardComp.vue'
    import NavBar from '../components/Navbar.vue'
    import {
        getAll,
        searchContent,
        filterBar,
        isLoggedIn
    } from '../utils'

    export default {
        components: {
            Card,
            NavBar
        },
        data() {
            return {
                recipes: [],
                recipeFiltered: [],
                searchPhrase: '',
                selectedCuisine: 'Cuisines',
                selectedDiet: 'Diet',
                selectedDish: 'Dish',
            }
        },
        methods: {
            isLoggedIn,
            getAllRecipe() {
                console.log('start method');
                getAll().then((value) => {
                    this.recipes = value
                }).catch((message) => {
                    this.recipes = message
                })
                console.log('end methods');
            },
            getAllSearchResult() {
                console.log('start method');
                this.selectedCuisine = 'Cuisines',
                    this.selectedDiet = 'Diet',
                    this.selectedDish = 'Dish',
                    searchContent(this.searchPhrase).then((value) => {
                        this.recipeFiltered = value
                    }).catch((message) => {
                        this.recipeFiltered = message
                    })
                console.log('end methods');
            },
            filterSearch(selectedCuisine, selectedDiet, selectedDish) {
                console.log('start method');
                filterBar(selectedCuisine, selectedDiet, selectedDish).then((value) => {
                    this.recipeFiltered = value
                }).catch((message) => {
                    this.recipeFiltered = message
                })
                console.log('end methods');
            },
        },
        mounted() {
            console.log('start mounted');
            this.getAllRecipe()
            console.log('end mounted');
        }
    }
</script>

<template>
    <!--Start of NavBar-->
    <NavBar @checkLogin="isLoggedIn()"></NavBar>
    <!--End of NavBar-->
    <div class="shopping-list-header">
        <h1 class="text-center">Recipe Finder</h1>
    </div>

    <div class="container-fluid">
        <div class="row">
            <!--Start of Search Bar-->
            <div class="col">
                <div class="search">
                    <nav class="navbar">
                        <div class="d-flex my-3 my-lg-2 w-75 mx-auto">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                                v-model="searchPhrase" @keyup.enter="getAllSearchResult()">
                            <button class="btn btn-outline-primary ms-2 my-sm-0" type="submit"
                                @click="getAllSearchResult()">Search</button>
                        </div>
                    </nav>
                </div>
            </div>
            <!--End of Search Bar-->
        </div>
        <div class="row my-3 g-3 justify-content-between">
            <div class="col-1"></div>
            <!--Start of filter Bar-->
            <div class="col-3">
                <select class="form-select" aria-label="Cuisine" v-model="selectedCuisine"
                    @change="filterSearch(selectedCuisine, selectedDiet, selectedDish)">
                    <option value="Cuisines">Cuisines</option>
                    <option value="European">European</option>
                    <option value="Asian">Asian</option>
                    <option value="Italian">Italian</option>
                </select>
            </div>
            <!--End of filter Bar-->
            <!--Start of filter Bar-->
            <div class="col-3">
                <select class="form-select" aria-label="Diets" v-model="selectedDiet"
                    @change="filterSearch(selectedCuisine, selectedDiet, selectedDish)">
                    <option value="Diet">Diets</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="lacto ovo vegetarian">Vegetarian</option>
                </select>
            </div>
            <!--End of filter Bar-->
            <!--Start of filter Bar-->
            <div class="col-3">
                <select class="form-select" aria-label="Dish Type" v-model="selectedDish"
                    @change="filterSearch(selectedCuisine, selectedDiet, selectedDish)">
                    <option value="Dish">Dish Type</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="dessert">Dessert</option>
                </select>
            </div>
            <!--End of filter Bar-->
            <div class="col-1"></div>
        </div>

        <div class="row" v-if="recipeFiltered.length == 0">
            <!--Start of Recipe-->
            <!-- eslint-disable-next-line -->
            <Card v-for="recipe of recipes" :page="'all'" :image_url="recipe['image']" :recipeId="recipe['recipeId']"
                :name="recipe['recipeName']" :duration="recipe['duration']"
                :desc="recipe['summary'].slice(0, 150)+'...'"></Card>
            <!-- <Card :image_url="'tester'" :name="'fake'"></Card> -->
            <!-- End of Recipe -->
        </div>
        <div class="row" v-else>
            <!--Start of Recipe-->
            <!-- eslint-disable-next-line -->
            <Card v-for="recipe of recipeFiltered" :page="'all'" :image_url="recipe['image']"
                :recipeId="recipe['recipeId']" :name="recipe['recipeName']" :duration="recipe['duration']"
                :desc="recipe['summary'].slice(0, 150)+'...'"></Card>
            <!-- <Card :image_url="'tester'" :name="'fake'"></Card> -->
            <!-- End of Recipe -->
        </div>
    </div>
</template>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    .shopping-list-header {
        background-image: linear-gradient(to bottom right, #7395AE, #379683) !important;
        /* border-radius: 20px; */
        color: #fff !important;
        box-shadow: 0 0 40px 0 rgba(94, 92, 154, .06);
        margin-bottom: 5px;
    }
</style>