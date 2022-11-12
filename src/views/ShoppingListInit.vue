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
            if (this.isMobile()) {
                this.$router.push('/shoppinglistmobile');
            }
            else {
                this.$router.push('/shoppinglist');
            }
        }
    }
</script>
<style scoped>
</style>