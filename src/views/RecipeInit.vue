<template>
</template>
<script>
    export default {
        name: 'Init',
        methods: {
            isMobile() {
                if( screen.width <= 760 ) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        created() {
            console.log('in recipe Init');
            let queryType = this.$route.query.type;
            let selectedRecipe = this.$route.query.recipeId;
            if (this.isMobile()) {
                this.$router.push({path: '/recipemobile', query: {type: queryType, recipeId: selectedRecipe} });
            }
            else {
                this.$router.push({path: '/recipeweb', query: {type: queryType, recipeId: selectedRecipe} });
            }
        }
    }
</script>
<style scoped>
</style>