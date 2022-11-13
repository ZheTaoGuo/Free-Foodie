<script>
    import Card from '../components/CardComp.vue'
    import Footer from '../components/Footer.vue'
    import NavBar from '../components/Navbar.vue'
    import { getFavourite, searchFavPast, getLoggedInUser, isLoggedIn } from '../utils'

    export default {
        components: {
            Card,
            NavBar,
            Footer
        },
        data() {
            return {
                recipes: [],
                recipeFiltered: [],
                searchPhrase: '',
                loggedInUser: 0,
            }
        },
        methods: {
            isLoggedIn,
            getFavouriteRecipe() {
                console.log('start method');
                getFavourite(this.loggedInUser).then((value) => {
                    this.recipes = value
                }).catch((message) => {
                    this.recipes = message
                })
                console.log('end methods');
            },
            getFavouriteSearchResult() {
                console.log('start method');
                searchFavPast(this.loggedInUser, this.searchPhrase, 'fav').then((value) => {
                    this.recipeFiltered = value
                }).catch((message) => {
                    this.recipeFiltered = message
                })
                console.log('end methods');
            }
        },
        async mounted() {
            const currentUser = await getLoggedInUser();
            this.loggedInUser = currentUser.userId
            console.log('Current UserId: ', this.loggedInUser);

            console.log('start mounted');
            this.getFavouriteRecipe()
            console.log('end mounted');
        }
    }
</script>

<template>
    <!--Start of NavBar-->
    <NavBar @checkLogin="isLoggedIn()"></NavBar>
    <!--End of NavBar-->
    <div class="shopping-list-header">
        <h1 class="text-center">Favourite Recipes</h1>
    </div>

    <div class="container-fluid">

        <div class="row">
            <!--Start of Search Bar-->
            <div class="col">
                <div class="search">
                    <nav class="navbar">
                        <div class="d-flex my-3 my-lg-2 w-75 mx-auto">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchPhrase">
                            <button class="btn btn-primary ms-2 my-sm-0" type="submit" @click="getFavouriteSearchResult()">Search</button>
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
    <Footer style="position:fixed; left:0; bottom:0; width: 100%;"></Footer>
</template>

<style>
.card:hover{
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3)!important;
    transition-duration: 0.35s;
}

.shopping-list-header {
  background-image: linear-gradient(to bottom right, #7395AE, #379683) !important;
  /* border-radius: 20px; */
  color: #fff !important;
  box-shadow: 0 0 40px 0 rgba(94, 92, 154, .06);
  margin-bottom: 5px;
}
</style>