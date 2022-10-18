<script>
    // import { onMounted, ref } from 'vue'
    import Card from '../components/CardComp.vue'
    import Search from '../components/SearchBar.vue'
    // import {getItems} from '../utils/util'
    
    // const items = ref({})
    // onMounted(async () => {
    //     items.value = await getItems();
    // })

    export default {
        components: {
            Card, Search
        }

}
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <!--Start of NavBar-->
            <div class="col text-center">
                <h1>Past Recipes
                    <router-link to="/">
                        <button class="btn btn-primary">Back</button>
                    </router-link>
                </h1>
            </div> <!--End of NavBar-->
        </div>

        <div class="row">
            <!--Start of Search Bar-->
            <div class="col">
                <search></search>
            </div><!--End of Search Bar-->
        </div>

        <div class="row">
             <!--Start of Recipe-->
            <Card v-for="n in 1" v-bind:key="n"></Card>
            <!-- End of Recipe -->
        </div>
        
    </div>
</template>

<style>

</style>