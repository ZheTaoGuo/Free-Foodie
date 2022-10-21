<script>
    import Card from '../components/CardComp.vue'
    import Search from '../components/SearchBar.vue'
    import data from '../recipes.json'
    import {getFavourite} from '../utils'

    var recipes = getFavourite()
    console.log(recipes);

    export default {
        components: {
            Card,
            Search
        },
        data() {
            return {
                recipes
            }
        }
    }
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <!--Start of NavBar-->
            <div class="col text-center">
                <h1>Favourite Recipes
                    <router-link to="/">
                        <button class="btn btn-primary">Back</button>
                    </router-link>
                </h1>
            </div>
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
            <Card v-for="recipe of recipes"  :image_url="recipe[0]['image']" :name="recipe[0]['recipeName']" :duration="recipe[0]['duration']" :desc="recipe[0]['summary'].slice(0, 150)+'...'"></Card>
            <!-- <Card :image_url="'tester'" :name="'fake'"></Card> -->
            <!-- End of Recipe -->
        </div>

    </div>
</template>

<style>

</style>