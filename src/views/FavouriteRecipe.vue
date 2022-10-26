<script>
    import Card from '../components/CardComp.vue'
    import Search from '../components/SearchBar.vue'
    import NavBar from '../components/Navbar.vue'
    import { getFavourite } from '../utils'

    const USERID = 1

    export default {
        components: {
            Card,
            Search,
            NavBar
        },
        data() {
            return {
                recipes: [],
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
    <div class="container-fluid">
        <div class="row">
            <!--Start of NavBar-->
            <NavBar></NavBar>
            <!-- <div class="col text-center">
                <h1>Favourite Recipes
                    <router-link to="/">
                        <button class="btn btn-primary">Back</button>
                    </router-link>
                </h1>
            </div> -->
            <!--End of NavBar-->
        </div>

        <div class="row">
            <!--Start of Search Bar-->
            <div class="col">
                <search></search>
            </div>
            <!--End of Search Bar-->
        </div>

        <div class="row">
            <!--Start of Recipe-->
            <!-- eslint-disable-next-line -->
            <Card v-for="recipe of recipes" :page="'favourite'" :image_url="recipe['image']" :recipeId="recipe['recipeId']" :name="recipe['recipeName']"
                :duration="recipe['duration']" :desc="recipe['summary'].slice(0, 150)+'...'"></Card>
            <!-- <Card :image_url="'tester'" :name="'fake'"></Card> -->
            <!-- End of Recipe -->
        </div>

    </div>
</template>

<style>

</style>