<script>
    import Card from '../components/CardComp.vue'
    import Search from '../components/SearchBar.vue'
    import NavBar from '../components/Navbar.vue'
    import { getAll } from '../utils'

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
            console.log('start mounted');
            this.getAllRecipe()
            console.log('end mounted');
        }
    }
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <!--Start of NavBar-->
            <NavBar></NavBar>
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
            <!--Start of filter Bar-->
            <div class="col">
                <search></search>
            </div>
            <!--End of filter Bar-->
        </div>

        <div class="row">
            <!--Start of Recipe-->
            <!-- eslint-disable-next-line -->
            <Card v-for="recipe of recipes" :page="'all'" :image_url="recipe['image']" :recipeId="recipe['recipeId']" :name="recipe['recipeName']"
                :duration="recipe['duration']" :desc="recipe['summary'].slice(0, 150)+'...'"></Card>
            <!-- <Card :image_url="'tester'" :name="'fake'"></Card> -->
            <!-- End of Recipe -->
        </div>
    </div>
</template>

