<script>
    import Card from '../components/CardComp.vue'
    import NavBar from '../components/Navbar.vue'
    import { getFavourite, searchFavPast } from '../utils'

const USERID = 1

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
            }
        },
        methods: {
            getFavouriteRecipe() {
                console.log('start method');
                getFavourite(USERID).then((value) => {
                    this.recipes = value
                }).catch((message) => {
                    this.recipes = message
                })
                console.log('end methods');
            },
            getFavouriteSearchResult() {
                console.log('start method');
                searchFavPast(USERID, this.searchPhrase, 'fav').then((value) => {
                    this.recipeFiltered = value
                }).catch((message) => {
                    this.recipeFiltered = message
                })
                console.log('end methods');
            }
        },
        mounted() {
            console.log('start mounted');
            this.getFavouriteRecipe()
            console.log('end mounted');
        }
    }
</script>

<template>
    <!--Start of NavBar-->
    <NavBar></NavBar>
    <!--End of NavBar-->
    <div class="container">

        <div class="row">
            <!--Start of Search Bar-->
            <div class="col">
                <div class="search">
                    <nav class="navbar">
                        <div class="d-flex my-3 my-lg-2 w-75 mx-auto">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchPhrase">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="getFavouriteSearchResult()">Search</button>
                        </div>
                    </nav>
                </div>
            </div>
            <!--End of Search Bar-->
        </div>

        <div class="row" v-if="recipeFiltered.length == 0">
            <!--Start of Recipe-->
            <!-- eslint-disable-next-line -->
            <Card v-for="recipe of recipes" :page="'favourite'" :image_url="recipe['image']"
                :recipeId="recipe['recipeId']" :name="recipe['recipeName']" :duration="recipe['duration']"
                :desc="recipe['summary'].slice(0, 150) + '...'" ></Card>
            <!-- <Card :image_url="'tester'" :name="'fake'"></Card> -->
            <!-- End of Recipe -->
        </div>
        <div class="row" v-else>
            <!--Start of Recipe-->
            <!-- eslint-disable-next-line -->
            <Card v-for="recipe of recipeFiltered" :page="'favourite'" :image_url="recipe['image']" :recipeId="recipe['recipeId']" :name="recipe['recipeName']"
                :duration="recipe['duration']" :desc="recipe['summary'].slice(0, 150)+'...'"></Card>
            <!-- <Card :image_url="'tester'" :name="'fake'"></Card> -->
            <!-- End of Recipe -->
        </div>

    </div>
</template>

<style>
.card:hover{
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3)!important;
    transition-duration: 0.35s;
}
</style>